export const state = () => ({
    posts: [],
    post: []
})

export const getters = {
    posts(state) {
        return state
    },
}

export const mutations = {
    SET_POSTS(state, posts) {
        state.posts = posts
    },
    SET_POST(state, post) {
        state.post = post
    }
}

export const actions = {
    async get_posts({ commit }) {
        const res = await this.$repositories.posts.all()
        const { status, data } = res
        if (status === 200) {
            commit('SET_POSTS', data)
        } else {
            // Handle error here
        }
    },

    async get_post({ commit }, post) {
        const res = await this.$repositories.posts.show(post)
        const { status, data } = res
        if (status === 200) {
            commit('SET_POST', data)
        } else {
            // Handle error here
        }
    },

    async create_post({ commit }, id, post) {
        const res = await this.$repositories.posts.create(id, post)
        const { status, data } = res
        if (status === 200) {
            commit('SET_POST', data)
        } else {
            // Handle error here
        }
    },

    async update_post({ commit }, id, post) {
        const res = await this.$repositories.posts.update(id, post)
        const { status, data } = res
        if (status === 200) {
            commit('SET_POST', data)
        } else {
            // Handle error here
        }
    },

    async delete_post({ commit }, id) {
        const res = await this.$repositories.posts.delete(id)
        const { status } = res
        if (status === 200) {
            // Remove from store
        } else {
            // Handle error here
        }
    }
}
