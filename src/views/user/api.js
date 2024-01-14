import http from '@/lib/http'

export default function getUserById(id) {
  return http.get(`/api/v1/users/${id}`)
}
