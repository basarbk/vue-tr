import http from '@/lib/http'

export default function login(body) {
  return http.post('/api/v1/auth', body)
}
