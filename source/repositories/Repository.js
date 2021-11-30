import PostRepository from '~/repositories/PostRepository'
import JobRepository from "~/repositories/JobRepository";
import AccountRepository from "~/repositories/AccountRepository";

export default ($axios) => ({
  posts: PostRepository($axios),
  jobs: JobRepository($axios),
  accounts: AccountRepository($axios),
})

