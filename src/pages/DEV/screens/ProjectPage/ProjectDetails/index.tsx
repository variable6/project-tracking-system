// import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
  isExact: boolean
  params: any
  path: string
  url: string
}

const Index = ({ match }: { match: MatchParams }) => {

  console.log(match.params?.projectId)

  return (
    <></>
  );
}

export default Index