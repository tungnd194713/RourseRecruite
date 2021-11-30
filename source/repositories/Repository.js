import PostRepository from '~/repositories/PostRepository'
import JobRepository from "~/repositories/JobRepository";
import AccountRepository from "~/repositories/AccountRepository";
import CompanyRepository from "~/repositories/CompanyRepository";

export default ($axios) => ({
  post: PostRepository($axios),
  jobs: JobRepository($axios),
  account: AccountRepository($axios),
  profiles: CompanyRepository($axios),
})

