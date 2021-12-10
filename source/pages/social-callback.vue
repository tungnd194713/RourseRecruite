<template>
    <div class="container">
        <div class="loader"></div>
        <p>しばらくお待ちください。</p>
    </div>
</template>

<script>
    export default {
        // middleware: ['authenticated'],
        name: "FacebookCallback",

        data() {
            return {
                token: this.$route.query.token ? this.$route.query.token : null
            }
        },

        head () {
            return {title: 'Facebook callback'}
        },

        mounted() {
            this.$auth.setToken('local', 'Bearer ' + this.token);
            this.$auth.setStrategy('local');

            this.$auth.fetchUser().then(() => {
                return this.$router.push('/jobs');
            }).catch((e) => {
                this.$auth.logout();
                if (this.$route.query.origin === 'login') {
                    return this.$router.push(`/login?error=1`);
                } else {
                    return this.$router.push(`/register?error=1`);
                }

            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/pages/auth/social-callback.scss';
</style>
