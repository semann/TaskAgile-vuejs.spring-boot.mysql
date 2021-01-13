// import Vue from 'vue'
import RegisterPage from '@/views/RegisterPage'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

// vm.$router 에 접근할 수 있도록
// 테스트에 Vue Router 추가하기
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

// registrationService의 Mock
jest.mock('@/services/registration')

describe('RegisterPage.vue', () => {
  let wrapper
  let fieldUsername
  let fieldEmailAddress
  let fieldPassword
  let buttonSubmit

  beforeEach(() => {
    wrapper = mount(RegisterPage, {
        localVue,
        router
    })

    fieldUsername = wrapper.find('#username')
    fieldEmailAddress = wrapper.find('#emailAddress')
    fieldPassword = wrapper.find('#password')
    buttonSubmit = wrapper.find('form button[type="submit"]')
  })

  afterAll(() => {
      jest.restoreAllMocks()
  })

  it('should render registration form', () => {
    // const Constructor = Vue.extend(RegisterPage)
    // const vm = new Constructor().$mount()
    // expect(vm.$el.querySelector('.logo').getAttribute('src'))
    //       .toEqual('/static/images/logo.png')
    // expect(vm.$el.querySelector('.tagline').textContent)
    //       .toEqual('Open source task management tool')
    // expect(vm.$el.querySelector('#username').value)
    //       .toEqual('')
    // expect(vm.$el.querySelector('#emailAddress').value)
    //       .toEqual('')
    // expect(vm.$el.querySelector('#password').value)
    //       .toEqual('')
    // expect(vm.$el.querySelector('form button[type="submit"]').textContent)
    //       .toEqual('Create account')
    expect(wrapper.find('.logo').attributes().src)
        .toEqual('/static/images/logo.png')
    expect(wrapper.find('.tagline').text())
        .toEqual('Open source task management tool')
    expect(fieldUsername.element.value)
        .toEqual('')
    expect(fieldEmailAddress.element.value)
        .toEqual('')
    expect(fieldPassword.element.value)
        .toEqual('')
    expect(buttonSubmit.text())
        .toEqual('Create account')
  })

  it('should contain data model with initial values', () => {
      expect(wrapper.vm.form.username).toEqual('')
      expect(wrapper.vm.form.emailAddress).toEqual('')
      expect(wrapper.vm.form.password).toEqual('')
  })

//   it('should have form inputs bound with data model', () => {
  it('should have form inputs bound with data model', async () => {
      const username = 'sunny'
      const emailAddress = 'sunny@local'
      const password = 'VueJsRocks!'

    //   wrapper.vm.form.username = username
    //   wrapper.vm.form.emailAddress = emailAddress
    //   wrapper.vm.form.password = password
      await wrapper.setData({
          form: {
              username: username,
              emailAddress: emailAddress,
              password: password
          }
      })
      expect(fieldUsername.element.value).toEqual(username)
      expect(fieldEmailAddress.element.value).toEqual(emailAddress)
      expect(fieldPassword.element.value).toEqual(password)
  })

  it('should have form submit event handler `submitForm`', () => {
      const stub = jest.fn()
      wrapper.setMethods({submitForm: stub})
      buttonSubmit.trigger('submit')
      expect(stub).toBeCalled()
  })

  it('should register when it is a new user', async () => {
      const stub = jest.fn()
      wrapper.vm.$router.push = stub
    //   wrapper.vm.form.username = 'sunny'
    //   wrapper.vm.form.emailAddress = 'sunny@local'
    //   wrapper.vm.form.password = 'Jest!'
      await wrapper.setData({
        form: {
            username: 'sunny',
            emailAddress: 'sunny@local',
            password: 'Jest!'
        }
      })
      wrapper.vm.submitForm()
      wrapper.vm.$nextTick(() => {
          expect(stub).toHaveBeenCalledWith({name: 'LoginPage'})
      })
  })

  it('should fail it is not a new user', () => {
      // Mock에서는 오직 sunny@local만 새로운 사용자다.
      wrapper.vm.form.emailAddress = 'ted@local'
      expect(wrapper.find('.failed').isVisible()).toBe(false)
      wrapper.vm.submitForm()
      wrapper.vm.$nextTick(null, () => {
          expect(wrapper.find('.failed').isVisible()).toBe(true)
      })
  })
})
