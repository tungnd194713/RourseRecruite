import PostRepository from '~/repositories/PostRepository'
import JobRepository from "~/repositories/JobRepository";
import AccountRepository from "~/repositories/AccountRepository";
import CompanyRepository from "~/repositories/CompanyRepository";
import CandidateApplyRepository from "~/repositories/CandidateApplyRepository";
import InvoiceRepository from "~/repositories/InvoiceRepository";
import PaymentRepository from "~/repositories/PaymentRepository";
import EducationRepository from "~/repositories/EducationRepository";

export default ($axios) => ({
  posts: PostRepository($axios),
  jobs: JobRepository($axios),
  accounts: AccountRepository($axios),
  profiles: CompanyRepository($axios),
  candidatesApply: CandidateApplyRepository($axios),
  invoices: InvoiceRepository($axios),
  payments: PaymentRepository($axios),
  educations: EducationRepository($axios),
})

