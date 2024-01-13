import http from '@/lib/http'

export default function activate(token) {
  return http.patch(`/api/v1/users/${token}/active`)
}
