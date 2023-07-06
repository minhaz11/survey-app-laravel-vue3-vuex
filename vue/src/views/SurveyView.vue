<template lang="">
    <div>
        <header class="bg-white shadow">
          <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ model.id ? model.title : "Create Survey"}}</h1>
           
          </div>
        </header>
        <main>
          <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <form @submit.prevent="saveSurvey">
                <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div>
                            <label for="" class="block text-sm front-medium text-gray-700">
                                Image
                            </label>
                            <div class="mt-1 flex items-center">
                                <img v-if="model.image" :src="model.image" :alt="model.title" class="w-64 h-48 object-cover">
                                <span v-else class="flex items-center justify-center h-12 w-1 rounded-full overflow-hidden bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[80%] w-[80%] text-gray-300">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                  </svg>
                                  </span>

                                  <button
                                    type="button"
                                    class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <input
                                    type="file"
                                    @change="onImageChoose"
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                    />
                                    Change
                                 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
          </div>
        </main>
      </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const model = ref({
    title : "",
    description : null,
    questions : [],
    status : false,
    image : null,
    expire_date : null,
})

if(route.params.id) {
    model.value = store.state.surveys.find((survey) => {
       survey.id == parseInt(route.params.id)
    })
}

</script>
