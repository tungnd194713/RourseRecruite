<template>
  <div id="staticBackdrop" class="modal fade cv_user" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl position-relative">
      <div class="modal-content">
        <div class="container-btn-language">
          <button
            type="button"
            class="btn-language btn-language-first"
            :class="{ 'btn-language-active': language === lang_ja}"
            @click.prevent.stop="changeLanguage(lang_ja)"
          >
            JA
          </button>
          <button
            type="button"
            class="btn-language btn-language-last"
            :class="{ 'btn-language-active': language === lang_vi}"
            @click.prevent.stop="changeLanguage(lang_vi)"
          >
            VI
          </button>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <img src="../../assets/images/icon_modal_close.svg" alt="">
        </button>
        <div class="modal-body">
          <div class="content">
            <div class="row">
              <div class="col-12 list-user">
                <table class="table">
                  <tbody>
                  <tr>
                    <td colspan="5" class="border-0">
                      <div class="d-flex align-items-end">
                        <h2 class="fw-bold flex-grow-1">{{ $t('cv_user.title')}}</h2>
                        <div v-if="language === lang_vi" class="">
                          Ngày<span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('D')}}</span>
                          Tháng<span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('M')}}</span>
                          Năm<span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('YYYY')}}</span>
                        </div>
                        <div v-if="language === lang_ja" class="">
                          <span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('YYYY')}}</span>年
                          <span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('M')}}</span>月
                          <span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('D')}}</span>日現在
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-bottom-dot text-center">{{ $t('cv_user.furigana')}}</td>
                    <td colspan="3" class="border-bottom-dot">トランバンアン</td>
                    <td rowspan="2">
                      <div class="text-center mb-3">{{ $t('cv_user.gender')}}</div>
                      <div v-if="language === lang_vi" class="text-center">{{ defaultLangAndText.defaultGenderListVi[candidate.gender]}}</div>
                      <div v-if="language === lang_ja" class="text-center">{{ defaultLangAndText.defaultGenderListJa[candidate.gender]}}</div>
                    </td>
                    <td rowspan="4" class="card-photo">
                      <img :src="url_file + candidate.profile_image" alt="">
                    </td>
                  </tr>
                  <tr>
                    <td class="border-top-dot text-center">{{ $t('cv_user.name')}}</td>
                    <td colspan="3" class="border-top-dot">
                      {{ candidate.first_name ? candidate.first_name.toUpperCase() : ''}}
                      {{ candidate.name ? candidate.name.toUpperCase() : ''}}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">{{ $t('cv_user.birthday')}}</td>
                    <td v-if="language === lang_vi" colspan="2">
                      <div>
                        Ngày
                        <span class="mx-2 mx-md-3">
                            {{ $moment(candidate.birthday).format('D/M/YYYY')}}
                          </span>
                      </div>
                      <div class="text-center">
                        (Tròn <span class="mx-2 mx-md-3">{{ Math.abs($moment(candidate.birthday).diff($moment(), 'years'))}}</span>tuổi)
                      </div>
                    </td>
                    <td v-if="language === lang_ja" colspan="2">
                      <div>
                        {{ $moment(candidate.birthday).format('YYYY')}}年
                        <span class="mx-2 mx-md-3">
                            {{ $moment(candidate.birthday).format('MM')}}月
                          </span>
                        {{ $moment(candidate.birthday).format('DD')}}日生
                      </div>
                      <div class="text-center">
                        (満<span class="mx-2 mx-md-3">{{ Math.abs($moment(candidate.birthday).diff($moment(), 'years'))}}</span>歳)
                      </div>
                    <td>
                      <div class="text-start">{{ $t('cv_user.nationality')}}</div>
                      <div v-if="language === lang_vi" class="text-center">{{ defaultLangAndText.defaultNationalityListVi[candidate.nationality - 1]}}</div>
                      <div v-if="language === lang_ja" class="text-center">{{ defaultLangAndText.defaultNationalityListJa[candidate.nationality - 1]}}</div>
                    </td>
                    <td>
                      <div class="text-start">{{ $t('cv_user.language')}}</div>
                      <div v-if="language === lang_vi" class="text-center">{{ defaultLangAndText.defaultLanguageListVi[candidate.language - 1]}}</div>
                      <div v-if="language === lang_ja" class="text-center">{{ defaultLangAndText.defaultLanguageListJa[candidate.language - 1]}}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <div class="text-start">{{ $t('cv_user.phone_number')}}</div>
                      <div class="text-center">{{ candidate.phone_number}}</div>
                    </td>
                    <td colspan="3">
                      <div class="text-start">{{ $t('cv_user.email')}}</div>
                      <div class="text-center">{{ candidate.email}}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-bottom-dot text-center">{{ $t('cv_user.furigana')}}</td>
                    <td colspan="5" class="border-bottom-dot"></td>
                  </tr>
                  <tr>
                    <td class="border-top-dot text-center">{{ $t('cv_user.address')}}</td>
                    <td colspan="5" class="border-top-dot">{{ candidate.address}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <table class="table border-2">
                  <thead>
                  <tr class="text-center">
                    <th>{{ $t('cv_user.year')}}</th>
                    <th>{{ $t('cv_user.month')}}</th>
                    <th>{{ $t('cv_user.educations')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="education in educationsOfCandidate" :key="education.id">
                    <td v-if="language === lang_vi" class="text-center">Năm {{ $moment(education.start_at).format('YYYY')}}</td>
                    <td v-if="language === lang_vi" class="text-center">{{ $moment(education.start_at).format('M')}}</td>
                    <td v-if="language === lang_ja" class="text-center">{{ $moment(education.start_at).format('YYYY')}}年</td>
                    <td v-if="language === lang_ja" class="text-center">{{ $moment(education.start_at).format('M')}}月</td>
                    <td>
                      <div class="row">
                        <div class="col-9">{{ education.name}}</div>
                        <div v-if="language === lang_vi" class="col-3">
                          {{ defaultLangAndText.defaultEducationsListVi[education.status - 1]}}
                        </div>
                        <div v-if="language === lang_ja" class="col-3">
                          {{ defaultLangAndText.defaultEducationsListJa[education.status - 1]}}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <div class="text-end">{{ $t('cv_user.end')}}</div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr class="text-center">
                    <th>{{ $t('cv_user.year')}}</th>
                    <th>{{ $t('cv_user.month')}}</th>
                    <th>{{ $t('cv_user.jobs')}}</th>
                  </tr>

                  <tr v-for="job in jobsOfCandidate" :key="job.id">
                    <td v-if="language === lang_vi" class="text-center">Năm {{ $moment(job.start_at).format('YYYY')}}</td>
                    <td v-if="language === lang_vi" class="text-center">{{ $moment(job.start_at).format('M')}}</td>
                    <td v-if="language === lang_ja" class="text-center">{{ $moment(job.start_at).format('YYYY')}}年</td>
                    <td v-if="language === lang_ja" class="text-center">{{ $moment(job.start_at).format('M')}}月</td>
                    <td>
                      <div class="row">
                        <div class="col-9">{{ job.name}}</div>
                        <div v-if="language === lang_vi" class="col-3">
                          {{ job.status === 1 ?
                          '～' + $moment(job.end_at).format('M/YYYY') :
                          'Hiện đang làm'}}
                        </div>
                        <div v-if="language === lang_ja" class="col-3">
                          {{ job.status === 1 ?
                          '～' + $moment(job.end_at).format('M/YYYY') :
                          '在職中'}}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <div class="text-end">{{ $t('cv_user.end')}}</div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="row">
              <div class="col-12 list-user">
                <table class="table tb-certificate border-2 text-center m-0">
                  <thead>
                  <tr>
                    <th>{{ $t('cv_user.self_assessment')}}</th>
                    <th colspan="4">
                      {{ $t('cv_user.level_1')}}
                      &emsp;
                      {{ $t('cv_user.level_2')}}
                      <br>
                      {{ $t('cv_user.level_3')}}
                    </th>
                  </tr>
                  <tr>
                    <th>{{ $t('cv_user.skill')}}</th>
                    <th>{{ $t('cv_user.skill_listen')}}</th>
                    <th>{{ $t('cv_user.skill_speak')}}</th>
                    <th>{{ $t('cv_user.skill_read')}}</th>
                    <th>{{ $t('cv_user.skill_write')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(language, index) in candidate.candidate_foreign_languages" :key="index">
                    <td>{{ language.language_name}}</td>
                    <td>{{ showIconSkill(JSON.parse(language.skill).listen)}}</td>
                    <td>{{ showIconSkill(JSON.parse(language.skill).speak)}}</td>
                    <td>{{ showIconSkill(JSON.parse(language.skill).read)}}</td>
                    <td>{{ showIconSkill(JSON.parse(language.skill).write)}}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>

                <table class="table tb-certificate text-center border-2 border-top-0">
                  <thead>
                  <tr>
                    <th>{{ $t('cv_user.year')}}</th>
                    <th>{{ $t('cv_user.month')}}</th>
                    <th>{{ $t('cv_user.certificates')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(certificate, index) in candidate.candidate_certificates" :key="index">
                    <td>Năm {{ $moment(certificate.receive_at).format('YYYY')}}</td>
                    <td>{{ $moment(certificate.receive_at).format('M')}}</td>
                    <td class="text-start">{{ certificate.name}}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>

                <table class="table border-2">
                  <tbody>
                  <tr>
                    <td>{{ $t('cv_user.reason_apply')}}</td>
                  </tr>
                  <tr>
                    <td class="py-4">{{ candidate.reason_apply}}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('cv_user.strength')}}</td>
                  </tr>
                  <tr>
                    <td class="py-4">{{ candidate.strength}}</td>
                  </tr>
                  </tbody>
                </table>

                <table class="table tb-2 text-center border-2 mb-0">
                  <tbody>
                  <tr>
                    <td>{{ $t('cv_user.married_status')}}</td>
                    <td>{{ $t('cv_user.dependent_person_part_1')}}<br>{{ $t('cv_user.dependent_person_part_2')}}</td>
                    <td>{{ $t('cv_user.health_part_1')}}<br>{{ $t('cv_user.health_part_2')}}</td>
                  </tr>
                  <tr v-if="language === lang_vi">
                    <td>{{ defaultLangAndText.defaultMarriedStatusListVi[candidate.married_status - 1]}}</td>
                    <td>{{ defaultLangAndText.defaultDependentPersonListVi[candidate.dependent_person]}}</td>
                    <td>{{ defaultLangAndText.defaultHealthListVi[candidate.health - 1]}}</td>
                  </tr>
                  <tr v-if="language === lang_ja">
                    <td>{{ defaultLangAndText.defaultMarriedStatusListJa[candidate.married_status - 1]}}</td>
                    <td>{{ defaultLangAndText.defaultDependentPersonListJa[candidate.dependent_person]}}</td>
                    <td>{{ defaultLangAndText.defaultHealthListJa[candidate.health - 1]}}</td>
                  </tr>
                  </tbody>
                </table>
                <table class="table  tb-2 text-center border-2 border-top-0">
                  <tbody>
                  <tr>
                    <td rowspan="2">{{ $t('cv_user.stay_experience_part_1')}}<br>{{ $t('cv_user.stay_experience_part_2')}}</td>
                    <td class="border-bottom-dot">{{ candidate.stay_experience_date}}</td>
                    <td rowspan="2">{{ $t('cv_user.visa_part_1')}}<br>{{ $t('cv_user.visa_part_2')}}</td>
                    <td class="border-bottom-dot">{{ candidate.visa_type}}</td>
                  </tr>
                  <tr>
                    <td class="border-top-dot">{{ candidate.stay_experience_purpose}}</td>
                    <td class="border-top-dot">{{ $moment(candidate.visa_date).format('D/M/YYYY')}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end footer">
            <img src="../../assets/images/icon_pdf_download.svg" alt="" @click="exportPdf()">
            <button class="btn btn-outline-secondary ms-5" data-bs-dismiss="modal" aria-label="Close">クローズ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import defaultInCvUser from "~/constants/defaultInCvUser"

  export default {
    name: "CvUserModal",

    props: [
      'candidate',
      'language',
      'educationsOfCandidate',
      'jobsOfCandidate',
      'idRow'
    ],

    data() {
      return {
        url_file: process.env.URL_FILE,
        lang_ja: defaultInCvUser.lang_ja,
        lang_vi: defaultInCvUser.lang_vi,
        defaultLangAndText: defaultInCvUser
      }
    },

    created() {

    },

    methods: {
      changeLanguage(newLanguage) {
        this.$emit('changeLanguageEvent', newLanguage)
      },

      async exportPdf() {
        return await this.$repositories.candidatesApply.exportCvPdf(this.idRow, {
          language: this.language
        }, {
          responseType: 'blob'
        }).then(res => {
          if (res.status === 200) {
            const file = new Blob(
              [res.data],
              {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
          }
        })
      },

      showIconSkill(level) {
        if (level === 1) {
          return '◯'
        } else if (level === 2) {
          return '△'
        } else if (level === 3) {
          return '×'
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../styles/pages/jobs/cv_user.scss';
</style>
