import ProductManagement from '../../../components/product/ProductManagement'
import AdminLayout from '../../../layout/AdminLayout'

const ProductManagementPage = () => {
    return (
        <div>
            <AdminLayout>
                <ProductManagement />
            </AdminLayout>
        </div>
    )
}

export default ProductManagementPage