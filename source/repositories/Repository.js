import PostRepository from '~/repositories/PostRepository'
import JobRepository from "~/repositories/JobRepository";

export default ($axios) => ({
  post: PostRepository($axios),
  jobs: JobRepository($axios),
})

