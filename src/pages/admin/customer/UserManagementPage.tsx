import AdminLayout from '../../../layout/AdminLayout'
import UserManagement from '../../../components/user/UserManagement'

const UserManagementPage = () => {
    return (
        <div>
            <AdminLayout>
                <UserManagement />
            </AdminLayout>
        </div>
    )
}

export default UserManagementPage