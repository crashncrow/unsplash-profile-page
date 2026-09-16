import Layout from 'components/Layout'
import ErrorState from 'components/ErrorState'

const ServerError = () => {
  return (
    <Layout
      title="Something went wrong · Unsplash Profile"
      description="An unexpected error occurred. Please try again later."
    >
      <ErrorState
        code="500"
        title="Something went wrong"
        description="An unexpected error occurred. Please try again later."
      />
    </Layout>
  )
}

export default ServerError
