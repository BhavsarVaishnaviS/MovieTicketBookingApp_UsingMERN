import React from 'react'
import AuthForm from './AuthForm'

const AdminAuth = ({ onSubmit, isAdmin }) => {
  return (
    <div>
        <AuthForm onSubmit={onSubmit} isAdmin={isAdmin} />
    </div>
  )
}

export default AdminAuth