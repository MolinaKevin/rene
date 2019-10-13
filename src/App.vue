<template>
  <div id="app">
    <header>
    </header>
    <main class="container-fluid">
      <b-row align-v="center">
        <b-card
                header-bg-variant="default"
                border-variant="light"
                header-class="bg-transparent"
                class="shadow p-3 mb-5 bg-white rounded text-center phone">
          <template v-slot:header>
            <b-nav card-header tabs>
              <b-nav-item @click="wechselArbeitnehmer()" :active="!unternehmen">Arbeitnehmer</b-nav-item>
              <b-nav-item @click="wechselUnternehmen()" :active="unternehmen">Unternehmen</b-nav-item>
            </b-nav>
          </template>
          <template v-if="!unternehmen">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group id="input-group-1">
                <b-form-input
                        id="input-1"
                        v-model="form.name"
                        required
                        placeholder="Name"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-2">
                <b-form-input
                        id="input-2"
                        v-model="form.last"
                        required
                        placeholder="Last name"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                      id="input-group-3"
              >
                <b-form-input
                        id="input-3"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Email"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                      id="input-group-4"
              >
                <b-form-input
                        id="input-4"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="Password"
                ></b-form-input>
              </b-form-group>

              <b-button block type="submit" variant="info">
                Find me a Job!
              </b-button>
              <hr />
              <b-button type="reset" variant="info">
                Log in
              </b-button>
            </b-form>
          </template>

          <template v-if="unternehmen">
            <b-form @submit="onSubmitUnternehmen" @reset="onResetUnternehmen" v-if="show">
              <b-form inline>
                <b-input
                        v-model="formu.name"
                        id="input2-1"
                        class=" mb-2 mr-1"
                        required
                        placeholder="Name"
                ></b-input>
                <b-input
                        v-model="formu.last"
                        id="input2-2"
                        class=" mb-2 ml-1"
                        required
                        placeholder="Last name"
                ></b-input>
              </b-form>
              <b-form inline>
                <b-form-input
                          v-model="formu.email"
                          class=" mb-2 mr-1"
                          id="input2-3"
                          required
                          placeholder="Email"
                  ></b-form-input>
                  <b-form-input
                          id="input2-4"
                          class=" mb-2 ml-1"
                          v-model="formu.phone"
                          required
                          placeholder="Phone number (Optional)"
                  ></b-form-input>
              </b-form>
              <b-form-select
                      v-model="formu.selected"
                      :options="formu.options"
                      id="input2-5"
                      class=" mb-2"
              >
              </b-form-select>
              <b-form-input
                      v-model="formu.fname"
                      class=" mb-2"
                      id="input2-6"
                      required
                      placeholder="Company name"
              ></b-form-input>
              <b-form inline>
                <b-input
                        v-model="formu.hl"
                        id="input2-7"
                        class=" mb-2 mr-1"
                        required
                        placeholder="Hiring Location"
                ></b-input>
                <!-- Keine Ahnung, was Hiring Location bedeutet -->
                <b-input
                        v-model="formu.employees"
                        id="input2-8"
                        class="mb-2 ml-1"
                        required
                        placeholder="Number of employees"
                ></b-input>
              </b-form>

              <b-form-input
                      v-model="formu.thn"
                      class="mb-2"
                      id="input2-6"
                      required
                      placeholder="Tech hires needed"
              ></b-form-input>

              <b-button
                      block type="submit"
                      variant="info"
              >
                Request invite
              </b-button>
              <hr />
              <b-button type="reset" variant="info">
                Log in
              </b-button>
            </b-form>
          </template>
        </b-card>
      </b-row>
    </main>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                posts: [],
                endpoint: 'https://jsonplaceholder.typicode.com/posts/',
                form: {
                    email: '',
                    name: '',
                    last: '',
                    password: '',
                },
                formu: {
                    email: '',
                    name: '',
                    last: '',
                    password: '',
                    hl: '',
                    thn: '',
                    fname: '',
                    employees: null,
                    selected: null,
                    options: [
                        { value: null, text: 'Job Title' },
                        { value: 1, text: 'Recruiting Team' },
                        { value: 2, text: 'Tech Team' },
                        { value: 3, text: 'CTO' },
                        { value: 4, text: 'Founder' },
                        { value: 5, text: 'Other' },
                    ]
                },
                show: true,
                unternehmen: true
            }
        },
        created() {
            this.getAllPosts();
        },
        methods: {
            getAllPosts() {
                axios.get(this.endpoint)
                    .then(response => {
                        this.posts = response.data;
                    })
                    .catch(error => {
                        console.log('-----error-------');
                        console.log(error);
                    })
            },
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.form))
            },
            onSubmitUnternehmen(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.formu))
            },
            onResetUnternehmen(evt) {
                evt.preventDefault()
                // Reset our form values
                this.formu.email = ''
                this.formu.name = ''
                this.formu.last = ''
                this.formu.phone = ''
                this.formu.hl = ''
                this.formu.thn = ''
                this.formu.fname = ''
                this.formu.employees = null
                this.formu.selected = null
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.last = ''
                this.form.password = ''
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            wechselArbeitnehmer() {
                this.unternehmen = false;
            },
            wechselUnternehmen() {
                this.unternehmen = true;
            }
        }
    }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: url('./assets/background.jpg') no-repeat center center fixed;
    background-size: cover;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  header {
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 90px;
    text-align: center;
    background:transparent;
  }
  main {
    display: flex;
    height: 100vh;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }
  aside {
    flex: 1 0 30%;
    height: 100%;
    overflow-y: auto;
    width: 30%;
    padding: 50px 30px;
    box-sizing: border-box;
    border-right: 1px solid #42b983;
  }
  .content {
    flex: 1 1 70%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .link {
    display: block;
    text-decoration: none;
    margin-bottom: 10px;
    color: #2c3e50;
    &--home {
      text-transform: uppercase;
      margin-bottom: 30px;
    }
    &.is-active {
      color: #42b983;
    }
  }
</style>