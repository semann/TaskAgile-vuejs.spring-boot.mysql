import moxios from 'moxios'
import registrationService from '@/services/registration'

describe('services/registration', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('should pass the response to caller when request succeeded', () => {
        expect.assertions(2)
        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            expect(request).toBeTruthy()
            request.respondWith({
                status: 200,
                response: {result: 'success'}
            })
        })

        return registrationService.register().then(data => {
            expect(data.result).toEqual('success')
        })
    })
})