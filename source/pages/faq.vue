<template>
    <main class="container my-3 my-lg-4">
        <div class="container tab-container">
            <div class="row">
                <h3 class="title-page text-center fw-bold">
                    FAQ – Câu hỏi thường gặp
                </h3>
            </div>
        </div>

        <div class="container text-center faq-con">
            <div
                v-for="data in datas"
                :key="data.value"
                class="row m-4 question-button"
            >
                <p>
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#' + data.class"
                                    aria-expanded="false"
                                    :aria-controls="data.class">
                        <div class="row">
                            <div
                                class="col-10 button-title fw-bold"
                                style="text-align: start; padding-left: 30px"
                            >
                                {{ data.title }}
                            </div>
                            <div
                                class="col-2 mid"
                                style="text-align: end; padding-right: 30px"
                            >
                                <img
                                    src="../assets/images/ic_plus.svg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </button>
                </p>
                <div :id="data.class" class="collapse">
                    <div class="card card-body">
                        {{ data.content }}
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

export default {
    name: 'Faq',
    layout: 'auth',
    data() {
        return {
            icon_click: '',
            datas: [
                {
                    value: 1,
                    title: '1. FAQ about Company review?',
                    class: 'about-company',
                    content:
                        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac',
                },
                {
                    value: 2,
                    title: '2. FAQ about CV Review?',
                    class: 'about-cv',
                    content:
                        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac',
                },
                {
                    value: 3,
                    title: '3. FAQ about AI Match for candidate?',
                    class: 'about-ai-match',
                    content:
                        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac',
                },
                {
                    value: 4,
                    title: '4. FAQ about Viet Nam Best IT Companies?',
                    class: 'about-vietnam-companies',
                    content:
                        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac',
                },
                {
                    value: 5,
                    title: '5. Tư cách lưu trú là gì?',
                    class: 'about-visa',
                    content:
                        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac',
                },
            ],
        }
    },
    head() {
        return { title: 'よくある質問 | 求人' }
    },
    method: {

    },
}
</script>

<style lang="scss" scoped>
@import '../styles/pages/faq.scss';
</style>
>
