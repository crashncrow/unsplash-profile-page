import Layout from 'components/Layout'
import ErrorState from 'components/ErrorState'

const NotFound = () => {
  return (
    <Layout
      title="Page not found · Unsplash Profile"
      description="The page you're looking for doesn't exist or was moved."
    >
      <ErrorState
        code="404"
        title="Page not found"
        description="The page you're looking for doesn't exist or was moved."
      />
    </Layout>
  )
}

export default NotFound
