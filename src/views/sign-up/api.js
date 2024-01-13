import http from '@/lib/http'

export default function signUp(body) {
  return http.post('/api/v1/users', body)
}
