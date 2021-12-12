<template>
    <main class="container my-3 my-lg-4">
        <div class="row box-title mb-1 mb-lg-2">
            <div class="col-md-6 col-12">
                <h4 class="page-header-title">応募者一覧</h4>
            </div>
            <div class="col-md-6 col-12 d-flex part-above-search">
                <h6 class="me-5 text-above-search">
                    在留資格はこのリンクから確認できます
                </h6>
                <a href="#" class="text-above-search link-above-search">abc.com</a>
            </div>
        </div>

        <div class="row box-search mt-2 px-3 pt-3 pb-2 rounded-pill">
            <div class="col-12 col-lg-4 mb-2">
                <input
                        v-model="condition.key_word"
                        type="text"
                        class="form-control rounded-pill"
                        placeholder="タイトル"
                />
            </div>
            <div class="col-12 col-lg-3 mb-2">
                <date-picker
                        id="apply_date"
                        v-model="condition.apply_date"
                        :clearable="false"
                        format="YYYY-MM-DD"
                        value-type="YYYY/MM/DD"
                        class="date-picker "
                        placeholder="応募日"
                >
                    <i slot="icon-calendar"></i>
                </date-picker>
            </div>
            <div class="col-12 col-lg-3 mb-2">
                <select
                        v-model="condition.status_stay"
                        class="form-select rounded-pill"
                        aria-label="在留資格確認ステータス"
                >
                    <option value="">在留資格確認ステータス</option>
                    <option value="1">未対応</option>
                    <option value="2">折り返し待ち</option>
                    <option value="3">面接待ち</option>
                    <option value="4">採用</option>
                    <option value="5">不採用（連絡取れず）</option>
                    <option value="6">不採用</option>
                </select>
            </div>
            <div class="col-12 col-lg-2">
                <button type="button" class="btn btn-sm rounded-pill btn-search-job" @click="search()">
                    <img src="../../assets/images/icon_search.svg" alt=""/>
                    <span class="px-4">検索</span>
                </button>
            </div>
        </div>

        <div class="container mt-3 mt-lg-4">
            <div class="row table-responsive box-table">
                <table class="table table-list-cv">
                    <thead>
                    <tr>
                        <th v-for="header in fields" :key="header.key">{{header.label}}</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items" :key="item.id" :class="item.read === 1 ? 'active' : ''">
                        <td class="align-middle py-3">
                          <span v-if="!(item.read || isWarningUnRead(item.created_at))" class="td-warning">
                            3日以上未対応
                            <img class="" src="../../assets/images/icon_warning.svg"/>
                          </span>
                            {{index + 1}}
                        </td>
                        <td class="align-middle py-3">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="popupCvUser(item)">
                                {{item.candidate.name}}
                            </a>
                        </td>
                        <td class="align-middle py-3">{{item.jobs.title}}</td>
                        <td class="align-middle py-3">{{$moment(item.created_at).format('YYYY-MM-DD')}}</td>
                        <td class="align-middle py-3">
                            {{item.candidate.form_recruitment}}
                            <template v-if="item.candidate.form_recruitment == 1">フルタイム</template>
                            <template v-else>アルバイト</template>
                        </td>
                        <td class="align-middle py-3">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#popUpId"
                               @click="popupImageCard(
                                   item.candidate.residence_card_front,
                                   item.candidate.residence_card_backside
                                   )">
                                <img
                                        class=""
                                        :src="url_file+item.candidate.residence_card_front"
                                />
                            </a>
                        </td>
                        <td class="align-middle py-3">
                            <select v-model="item.residence_card_confirm"
                                    class="form-select active rounded-3 confirm-select"
                                    @change="updateCard(item.id, {residence_card_confirm: item.residence_card_confirm})">
                                <option value="0">未選択</option>
                                <option value="1">承認</option>
                                <option value="2">非承認</option>
                            </select>
                        </td>
                        <td class="align-middle py-3 w-20">
                            {{item.note}}
                        </td>
                        <td class="align-middle py-3">
                            <select v-model="item.status"
                                    class="form-select active rounded-3 status-select"
                                    @change="updateItemStatus(item.id, {status: item.status})">
                                <option value="0">未選択</option>
                                <option value="1">未対応</option>
                                <option value="2">折り返し待ち</option>
                                <option value="3">面接待ち</option>
                                <option value="4">採用</option>
                                <option value="5">不採用（連絡取れず）</option>
                                <option value="6">不採用</option>
                            </select>
                        </td>
                        <td class="align-middle py-3">
                            <a
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#popUpCheck"
                                    @click="popupUpdateStatus({
                                    id: item.id,
                                    residence_card_confirm: item.residence_card_confirm,
                                    status: item.status,
                                    note: item.note
                                    })"
                            >
                                <img class="edit-icon" src="../../assets/images/icon_edit_list.svg"/>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :current-page="currentPage"
                        :per-page="perPage"
                        :total-items="totalItems"
                        :page-count="pageCount"
                        @nextPage="pageChangeHandle('next')"
                        @previousPage="pageChangeHandle('previous')"
                        @customPage="pageChangeHandle"
            />
        </div>

        <div id="popUpId"
             class="modal fade"
             data-bs-backdrop="static"
             data-bs-keyboard="false"
             tabindex="-1"
             aria-labelledby="popUpIdLabel"
             aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <a data-bs-dismiss="modal" class="btn-close" aria-label="Close">
                            <img src="../../assets/images/icon_modal_close.svg" alt=""/>
                        </a>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <h5 id="popUpIdLabel" class="modal-title">在留カード</h5>
                    </div>
                    <div class="modal-body d-flex justify-content-around">
                        <a href="#"
                        ><img
                                class="link-modal"
                                :src="url_file+image.residence_card_front"
                                alt=""
                        /></a>
                        <a href="#"
                        ><img
                                class="link-modal"
                                :src="url_file+image.residence_card_backside"
                                alt=""
                        /></a>
                    </div>
                </div>
            </div>
        </div>

        <div id="popUpCheck"
             class="modal fade"
             data-bs-backdrop="static"
             data-bs-keyboard="false"
             tabindex="-1"
             aria-labelledby="popUpCheckLabel"
             aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content check-content">
                    <div class="modal-header">
                        <a data-bs-dismiss="modal" class="btn-close" aria-label="Close">
                            <img src="../../assets/images/icon_modal_close.svg" alt=""/>
                        </a>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <h5 id="popUpCheckLabel" class="modal-title check-title">
                            応募者の応募状態更新
                        </h5>
                    </div>
                    <div class="modal-body pop-check-input">
                        <label for="confirmation">在留資格確認</label>
                        <select
                                id="confirmation"
                                v-model="dataUpdateStatus.residence_card_confirm"
                                class="form-select rounded-pill pop-check-select"
                                aria-label="Confirmation"
                        >
                            <!--<option selected></option>-->
                            <option value="0">未選択</option>
                            <option value="1">承認</option>
                            <option value="2">非承認</option>
                        </select>
                        <label for="status">ステータス</label>
                        <select
                                id="status"
                                v-model="dataUpdateStatus.status"
                                class="form-select rounded-pill pop-check-select"
                                aria-label="Status"
                        >
                            <option value="0">未選択</option>
                            <option value="1">未対応</option>
                            <option value="2">折り返し待ち</option>
                            <option value="3">面接待ち</option>
                            <option value="4">採用</option>
                            <option value="5">不採用（連絡取れず）</option>
                            <option value="6">不採用</option>
                        </select>
                        <label for="remarks">備考</label>
                        <textarea
                                id="remarks"
                                v-model="dataUpdateStatus.note"
                                class="form-control"

                        ></textarea>
                        <div class="submit-btn">
                            <button
                                    id="apply-btn"
                                    class="btn btn-primary mt-4 rounded-pill"
                                    data-bs-toggle="modal"
                                    data-bs-target="#popUpSuccess"
                                    @click="updateStatus()"
                            >
                                更新
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><img
              src="../../assets/images/icon_modal_close.svg" alt=""></button>
            <div v-if="language === lang_ja" class="modal-body">
              <div class="content">
                <div class="row">
                  <div class="col-12 list-user">
                    <table class="table">
                      <tbody>
                      <tr>
                        <td colspan="5" class="border-0">
                          <div class="d-flex align-items-end">
                            <h2 class="fw-bold flex-grow-1">履歴書</h2>
                            <div class="">
                              <span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('YYYY')}}</span>年
                              <span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('M')}}</span>月
                              <span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('D')}}</span>日現在
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="border-bottom-dot text-center">スヌワル</td>
                        <td colspan="3" class="border-bottom-dot">トランバンアン</td>
                        <td rowspan="2">
                          <div class="text-center mb-3">性別</div>
                          <div class="text-center">{{ defaultGenderList[candidate.gender]}}</div>
                        </td>
                        <td rowspan="4" class="card-photo">
                          <img :src="url_file + candidate.profile_image" alt="">
                        </td>
                      </tr>
                      <tr>
                        <td class="border-top-dot text-center">氏名</td>
                        <td colspan="3" class="border-top-dot">
                          {{ candidate.first_name ? candidate.first_name.toUpperCase() : ''}}
                          {{ candidate.name ? candidate.name.toUpperCase() : ''}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-center">生年月日</td>
                        <td colspan="2">
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
                        </td>
                        <td>
                          <div class="text-start">国籍</div>
                          <div class="text-center">{{ defaultNationalityList[candidate.nationality - 1]}}</div>
                        </td>
                        <td>
                          <div class="text-start">母国語</div>
                          <div class="text-center">{{ defaultLanguageList[candidate.language - 1]}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <div class="text-start">携帯電話番号</div>
                          <div class="text-center">{{ candidate.phone_number}}</div>
                        </td>
                        <td colspan="3">
                          <div class="text-start">E-mail</div>
                          <div class="text-center">{{ candidate.email}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td class="border-bottom-dot text-center">フリガナ</td>
                        <td colspan="5" class="border-bottom-dot"></td>
                      </tr>
                      <tr>
                        <td class="border-top-dot text-center">現住所</td>
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
                        <th>年</th>
                        <th>月</th>
                        <th>学歴</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="education in educationsOfCandidate" :key="education.id">
                        <td class="text-center">{{ $moment(education.start_at).format('YYYY')}}年</td>
                        <td class="text-center">{{ $moment(education.start_at).format('M')}}月</td>
                        <td>
                          <div class="row">
                            <div class="col-9">{{ education.name}}</div>
                            <div class="col-3">
                              {{ education.status === 1 ? 'Du kien tot nghiep' : 'Tot nghiep'}}
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
                          <div class="text-end">以上</div>
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
                        <th>年</th>
                        <th>月</th>
                        <th>職用(アルバィト含む)</th>
                      </tr>

                      <tr v-for="job in jobsOfCandidate" :key="job.id">
                        <td class="text-center">{{ $moment(job.start_at).format('YYYY')}}年</td>
                        <td class="text-center">{{ $moment(job.start_at).format('M')}}月</td>
                        <td>
                          <div class="row">
                            <div class="col-9">{{ job.name}}</div>
                            <div class="col-3">
                              {{ job.status === 1 ?
                              '～' + $moment(job.end_at).format('YYYY') + '年' + $moment(job.end_at).format('M') + '月' :
                              'Van di lam'}}
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
                          <div class="text-end">以上</div>
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
                        <th>自己靴</th>
                        <th colspan="4">◯（仕事上、問題なし）△（仕事上、ある程度てきる）×（少し不安）</th>
                      </tr>
                      <tr>
                        <th>スキル</th>
                        <th>聞くこと</th>
                        <th>話すこと</th>
                        <th>読むこと</th>
                        <th>書くこと</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(language, index) in candidate.languages" :key="index">
                        <td>{{ language.language_name}}</td>
                        <td v-if="JSON.parse(language.skill).listen === 1">◯</td>
                        <td v-if="JSON.parse(language.skill).listen === 2">△</td>
                        <td v-if="JSON.parse(language.skill).listen === 3">×</td>

                        <td v-if="JSON.parse(language.skill).speak === 1">◯</td>
                        <td v-if="JSON.parse(language.skill).speak === 2">△</td>
                        <td v-if="JSON.parse(language.skill).speak === 3">×</td>

                        <td v-if="JSON.parse(language.skill).read === 1">◯</td>
                        <td v-if="JSON.parse(language.skill).read === 2">△</td>
                        <td v-if="JSON.parse(language.skill).read === 3">×</td>

                        <td v-if="JSON.parse(language.skill).write === 1">◯</td>
                        <td v-if="JSON.parse(language.skill).write === 2">△</td>
                        <td v-if="JSON.parse(language.skill).write === 3">×</td>
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
                        <th>年</th>
                        <th>月</th>
                        <th>鮮・免許・賞割（上記以外のもの、取得予定含む）</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(certificate, index) in candidate.certificates" :key="index">
                        <td>{{ $moment(certificate.receive_at).format('YYYY')}}年</td>
                        <td>{{ $moment(certificate.receive_at).format('M')}}月</td>
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
                        <td>志望の動機</td>
                      </tr>
                      <tr>
                        <td class="py-4">{{ candidate.reason_apply}}</td>
                      </tr>
                      <tr>
                        <td>
                          長所
                        </td>
                      </tr>
                      <tr>
                        <td class="py-4">{{ candidate.strength}}</td>
                      </tr>
                      </tbody>
                    </table>

                    <table class="table tb-2 text-center border-2 mb-0">
                      <tbody>
                      <tr>
                        <td>配偶者</td>
                        <td>配偶者以外の<br>扶養家族</td>
                        <td>健康状態<br>(持病など有無)</td>
                      </tr>
                      <tr>
                        <td>{{ defaultMarriedStatusList[candidate.married_status - 1]}}</td>
                        <td>{{ defaultDependentPersonList[candidate.dependent_person]}}</td>
                        <td>{{ defaultHealthList[candidate.health - 1]}}</td>
                      </tr>
                      </tbody>
                    </table>
                    <table class="table  tb-2 text-center border-2 border-top-0">
                      <tbody>
                      <tr>
                        <td rowspan="2">日本滞在経歴<br>（期間・目的）</td>
                        <td class="border-bottom-dot">{{ candidate.stay_experience_date}}</td>
                        <td rowspan="2">耳得ビザ<br>（種素・有効期限）</td>
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

            <div v-if="language === lang_vi" class="modal-body">
              <div class="content">
                <div class="row">
                  <div class="col-12 list-user">
                    <table class="table">
                      <tbody>
                      <tr>
                        <td colspan="5" class="border-0">
                          <div class="d-flex align-items-end">
                            <h2 class="fw-bold flex-grow-1">Sơ yếu lý lịch</h2>
                            <div class="">
                              Ngày<span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('D')}}</span>
                              Tháng<span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('M')}}</span>
                              Năm<span class="mx-0 mx-md-3">{{ $moment(candidate.created_at).format('YYYY')}}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="border-bottom-dot text-center">Furigana</td>
                        <td colspan="3" class="border-bottom-dot">トランバンアン</td>
                        <td rowspan="2">
                          <div class="text-center mb-3">Giới tính</div>
                          <div class="text-center">{{ defaultGenderListVi[candidate.gender]}}</div>
                        </td>
                        <td rowspan="4" class="card-photo">
                          <img :src="url_file + candidate.profile_image" alt="">
                        </td>
                      </tr>
                      <tr>
                        <td class="border-top-dot text-center">Họ tên</td>
                        <td colspan="3" class="border-top-dot">
                          {{ candidate.first_name ? candidate.first_name.toUpperCase() : ''}}
                          {{ candidate.name ? candidate.name.toUpperCase() : ''}}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-center">Ngày tháng năm sinh</td>
                        <td colspan="2">
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
                        <td>
                          <div class="text-start">Quốc tịch</div>
                          <div class="text-center">{{ defaultNationalityListVi[candidate.nationality - 1]}}</div>
                        </td>
                        <td>
                          <div class="text-start">Tiếng mẹ đẻ</div>
                          <div class="text-center">{{ defaultLanguageListVi[candidate.language - 1]}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <div class="text-start">Số điện thoại</div>
                          <div class="text-center">{{ candidate.phone_number}}</div>
                        </td>
                        <td colspan="3">
                          <div class="text-start">E-mail</div>
                          <div class="text-center">{{ candidate.email}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td class="border-bottom-dot text-center">Furigana</td>
                        <td colspan="5" class="border-bottom-dot"></td>
                      </tr>
                      <tr>
                        <td class="border-top-dot text-center">Địa chỉ</td>
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
                        <th>Năm</th>
                        <th>Tháng</th>
                        <th>Học vấn</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="education in educationsOfCandidate" :key="education.id">
                        <td class="text-center">Năm {{ $moment(education.start_at).format('YYYY')}}</td>
                        <td class="text-center">{{ $moment(education.start_at).format('M')}}</td>
                        <td>
                          <div class="row">
                            <div class="col-9">{{ education.name}}</div>
                            <div class="col-3">
                              {{ education.status === 1 ? 'Dự kiến tốt nghiệp' : 'Tốt nghiệp'}}
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
                          <div class="text-end">Hết</div>
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
                        <th>Năm</th>
                        <th>Tháng</th>
                        <th>Kinh nghiệm làm việc (bao gồm cả làm thêm)</th>
                      </tr>

                      <tr v-for="job in jobsOfCandidate" :key="job.id">
                        <td class="text-center">Năm {{ $moment(job.start_at).format('YYYY')}}</td>
                        <td class="text-center">{{ $moment(job.start_at).format('M')}}</td>
                        <td>
                          <div class="row">
                            <div class="col-9">{{ job.name}}</div>
                            <div class="col-3">
                              {{ job.status === 1 ?
                              '～' + $moment(job.end_at).format('M/YYYY') :
                              'Van di lam'}}
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
                          <div class="text-end">Hết</div>
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
                        <th>Tự đánh giá</th>
                        <th colspan="4">
                          〇：Làm việc không vấn đề gì
                          &emsp;
                          △：Có thể làm được ở mức độ nào đó
                          <br>
                          ×：Hơi bất an khi làm việc
                        </th>
                      </tr>
                      <tr>
                        <th>Skill</th>
                        <th>Kỹ năng nghe</th>
                        <th>Kỹ năng nói</th>
                        <th>Kỹ năng đọc</th>
                        <th>Kỹ năng viết</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(language, index) in candidate.languages" :key="index">
                        <td>{{ language.language_name}}</td>
                        <td v-if="JSON.parse(language.skill).listen === 1">◯</td>
                        <td v-if="JSON.parse(language.skill).listen === 2">△</td>
                        <td v-if="JSON.parse(language.skill).listen === 3">×</td>

                        <td v-if="JSON.parse(language.skill).speak === 1">◯</td>
                        <td v-if="JSON.parse(language.skill).speak === 2">△</td>
                        <td v-if="JSON.parse(language.skill).speak === 3">×</td>

                        <td v-if="JSON.parse(language.skill).read === 1">◯</td>
                        <td v-if="JSON.parse(language.skill).read === 2">△</td>
                        <td v-if="JSON.parse(language.skill).read === 3">×</td>

                        <td v-if="JSON.parse(language.skill).write === 1">◯</td>
                        <td v-if="JSON.parse(language.skill).write === 2">△</td>
                        <td v-if="JSON.parse(language.skill).write === 3">×</td>
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
                        <th>Năm</th>
                        <th>Tháng</th>
                        <th>Bằng cấp, chứng chỉ, giải thưởng</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(certificate, index) in candidate.certificates" :key="index">
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
                        <td>Lý do ứng tuyển</td>
                      </tr>
                      <tr>
                        <td class="py-4">{{ candidate.reason_apply}}</td>
                      </tr>
                      <tr>
                        <td>
                          Điểm mạnh
                        </td>
                      </tr>
                      <tr>
                        <td class="py-4">{{ candidate.strength}}</td>
                      </tr>
                      </tbody>
                    </table>

                    <table class="table tb-2 text-center border-2 mb-0">
                      <tbody>
                      <tr>
                        <td>Tình trạng hôn nhân</td>
                        <td>Người phụ thuộc<br>ngoài vợ/ chồng</td>
                        <td>Tình trạng sức khỏe<br>(Có/không có các bệnh mãn tính)</td>
                      </tr>
                      <tr>
                        <td>{{ defaultMarriedStatusListVi[candidate.married_status - 1]}}</td>
                        <td>{{ defaultDependentPersonListVi[candidate.dependent_person]}}</td>
                        <td>{{ defaultHealthListVi[candidate.health - 1]}}</td>
                      </tr>
                      </tbody>
                    </table>
                    <table class="table  tb-2 text-center border-2 border-top-0">
                      <tbody>
                      <tr>
                        <td rowspan="2">Kinh nghiệm lưu trú tại Nhật<br>(Thời gian & Mục đích)</td>
                        <td class="border-bottom-dot">{{ candidate.stay_experience_date}}</td>
                        <td rowspan="2">Visa<br>(Loại visa & Thời hạn)</td>
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

    </main>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import DatePicker from 'vue2-datepicker'
    import 'vue2-datepicker/index.css'
    import 'vue2-datepicker/locale/ja'
    import Pagination from "../../components/Pagination";

    export default {
        name: "CandidateApply",
        components: {
            Pagination,
            DatePicker
        },
        layout: 'auth',

        data() {
            return {
                url_file: process.env.URL_FILE,
                items: [],
                fields: [
                    {
                        key: 'id',
                        label: 'No'
                    },
                    {
                        key: 'candidate_name',
                        label: '氏名'
                    },
                    {
                        key: 'job_title',
                        label: '求人タイトル'
                    },
                    {
                        key: 'apply_date',
                        label: '応募日'
                    },
                    {
                        key: 'employment_form',
                        label: '雇用形態'
                    },
                    {
                        key: 'residence_card',
                        label: '在留カード'
                    },
                    {
                        key: 'status_stay',
                        label: '在留資格確認'
                    },
                    {
                        key: 'note',
                        label: '備考'
                    },
                    {
                        key: 'status',
                        label: 'ステータス'
                    }
                ],
                currentPage: 1,
                perPage: 20,
                totalItems: 0,
                pageCount: 1,
                condition: {
                    key_word: '',
                    apply_date: '',
                    status_stay: ''
                },
                idRow: -1,
                dataUpdateStatus: {
                    residence_card_confirm: 0,
                    status: 0,
                    note: '',
                },
                image: {
                    residence_card_front: '',
                    residence_card_backside: ''
                },
              lang_ja: 'ja',
              lang_vi: 'vi',
              language: '',
              idCandidate: -1,
              candidate : {
                id: '',
                user_id: '',
                first_name : '',
                name : '',
                nationality : '',
                gender : '',
                birthday : '',
                email : '',
                profile_image : '',
                language : '',
                phone_number : '',
                address : '',
                married_status : '',
                dependent_person : '',
                health : '',
                visa_type : '',
                visa_date : '',
                residence_card_front : '',
                residence_card_backside : '',
                strength : '',
                stay_experience_date : '',
                stay_experience_purpose : '',
                reason_apply : '',
                file_cv_upload : '',
                desire_change_jobs : '',
                translate_jp : '',
                postal_code : '',
                province_id : '',
                district : '',
                status : '',
                created_at : '',
                updated_at : '',
                educations_jobs : [],
                languages : [],
                certificates : []
              },
              educationsOfCandidate: [],
              jobsOfCandidate: [],
              defaultGenderList: ['男', '女', 'Other'],
              defaultGenderListVi: ['Nam', 'Nữ', 'Khác'],
              defaultNationalityList: ['Japan', 'ベトナム'],
              defaultNationalityListVi: ['Nhật Bản', 'Việt Nam'],
              defaultLanguageList: ['Japanese', 'ベトナム語'],
              defaultLanguageListVi: ['Nhật Bản', 'Việt Nam'],
              defaultMarriedStatusList: ['無', '有'],
              defaultMarriedStatusListVi: ['Độc thân', 'Kết hôn'],
              defaultDependentPersonList: ['無', '有'],
              defaultDependentPersonListVi: ['Không', 'Có'],
              defaultHealthList: ['特病無し', 'Co benh ly nen'],
              defaultHealthListVi: ['Không có bệnh lý nền', 'Có bệnh lý nền']
            }
        },

        head () {
            return {title: '応募者一覧'}
        },

        computed: {
            next() {
                return (this.currentPage < this.pageCount) ? (this.currentPage + 1) : this.pageCount;
            },
            previous() {
                return (this.currentPage > 0) ? (this.currentPage - 1) : this.currentPage;
            },
        },

        created(){
            this.language = this.lang_ja
            this.getListCV(this.currentPage);
        },

        methods: {
            async getListCV(currentPage) {
                const condition = {...this.condition, currentPage};

                const {data} = await this.$repositories.candidatesApply.getListCV(condition);

                this.items = data.data;
                this.totalItems = data.total;
                this.currentPage = data.current_page;
                this.perPage = data.per_page;
                this.pageCount = (this.totalItems > 0) ? parseInt(data.total / data.per_page, 10) + 1 : 1;
            },

            pageChangeHandle(value) {
                switch (value) {
                    case 'next':
                        this.currentPage = this.next;
                        break;
                    case 'previous':
                        this.currentPage = this.previous;
                        break;
                    default:
                        this.currentPage = value
                }
                this.getListCV(this.currentPage);
            },

            search() {
                this.currentPage = 1;
                this.getListCV(this.currentPage);
            },

            isWarningUnRead(date) {
                const now = this.$moment().format('YYYY-MM-DD');
                date = this.$moment(date);

                return now < date.add(3, 'days').format('YYYY-MM-DD')
            },

            popupUpdateStatus(data) {
                this.idRow = data.id
                this.dataUpdateStatus.residence_card_confirm = data.residence_card_confirm
                this.dataUpdateStatus.status = data.status
                this.dataUpdateStatus.note = data.note
            },

            async updateStatus() {
                return await this.$repositories.candidatesApply.updateStatus(
                    this.idRow,
                    this.dataUpdateStatus
                ).then(res => {
                    this.idRow = -1;
                    if (res.status === 200) {
                        this.$toast.success('応募者の応募状態・更新が完了しました')
                        this.getListCV(this.currentPage);
                    } else {
                        this.$toast.success('候補者の申請状況と候補者名の更新は完了していません。')
                    }
                })
            },

            async updateCard(id, data) {
                return await this.$repositories.candidatesApply.updateStatus(
                    id, data
                ).then(res => {
                    this.idRow = -1;
                    if (res.status === 200) {
                        this.$toast.success('応募者の応募状態・更新が完了しました')
                        this.getListCV(this.currentPage);
                    } else {
                        this.$toast.success('候補者の申請状況と候補者名の更新は完了していません。')
                    }
                })
            },

            async updateItemStatus(id, data) {
                return await this.$repositories.candidatesApply.updateStatus(
                    id, data
                ).then(res => {
                    this.idRow = -1;
                    if (res.status === 200) {
                        this.$toast.success('応募者の応募状態・更新が完了しました')
                        this.getListCV(this.currentPage);
                    } else {
                        this.$toast.success('候補者の申請状況と候補者名の更新は完了していません。')
                    }
                })
            },

            popupImageCard(residenceCardFront, residenceCardBackside) {
                this.image.residence_card_front = residenceCardFront;
                this.image.residence_card_backside = residenceCardBackside
            },

          changeLanguage(newLanguage) {
            if (newLanguage !== this.language) {
              this.language = newLanguage
            }
          },

          popupCvUser(candidateApply) {
            this.language = this.lang_ja
            this.idRow = candidateApply.id
            this.candidate = Object.assign({}, candidateApply.candidate)
            this.educationsOfCandidate = this.candidate.educations_jobs.filter(function (element) {
              return element.type === 1
            })
            this.jobsOfCandidate = this.candidate.educations_jobs.filter(function (element) {
              return element.type === 2
            })
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
          }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/pages/candidates_apply/list.scss';
    @import '../../styles/pages/jobs/cv_user.scss';
</style>

<style lang="scss">
    @import '../../styles/pages/candidates_apply/listnotscoped.scss';
</style>
