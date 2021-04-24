import * as React from 'react'
import { FunctionComponent, useEffect, useState } from 'react'
import get from 'lodash.get'

const graphql = ({ query }) => {
    console.log(query)
    const [value, setValue] = useState({
        card: {
            text: null,
        },
    })
    const [isLoading, setIsLoading] = useState(true)

    // simulates http request
    setTimeout(() => setIsLoading(false), 5000)

    useEffect(() => {
        if (!isLoading) {
            setValue({
                card: {
                    text: 'hola',
                },
            })
        }
    }, [isLoading])

    return { graphQLResponse: value }
}

const withContentFul = (
    Component,
    query: string,
    mapper: Record<string, string>,
): FunctionComponent<IOrganismProps> => {
    const { graphQLResponse } = graphql({ query })

    const componentProps = Object.keys(mapper).reduce((result, key) => {
        result[mapper[key]] = get(graphQLResponse, key)

        return result
    }, {})

    return (props: IOrganismProps) => <Component {...componentProps} {...props} />
}

interface IOrganismProps {
    text?: string
    text2: string
    children?: React.ReactNode
}

const Organism = ({ text, text2 }: IOrganismProps) => {
    return (
        <div>
            <div>{text}</div>
            <div>{text2}</div>
        </div>
    )
}

export default () => {
    const graphQlMapper = {
        'card.text': 'text',
    }
    const OrganismWithContentFull = withContentFul(Organism, 'query', graphQlMapper)

    return (
        <div>
            <OrganismWithContentFull text2={'Second Text'} />
        </div>
    )
}
