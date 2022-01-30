import styled from "@emotion/styled"

const Root = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1rem;
    > a {
        color: #282c34;
        text-decoration: none;
    }
`

interface Props {
    children: React.ReactNode;
}

export default function Links({ children}: Props) {
    return (
        <Root>{children}</Root>
    )
}