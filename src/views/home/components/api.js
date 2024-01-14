import http from '@/lib/http'

export default function loadUsers() {
  return http.get('/api/v1/users', { params: { size: 3 } })
}
