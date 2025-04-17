import OrderManagement from '../../../components/order/OrderManagement'
import StaffLayout from '../../../layout/StaffLayout'

const OrderManagementPage = () => {
    return (
        <div>
            <StaffLayout>
                <OrderManagement />
            </StaffLayout>
        </div>
    )
}

export default OrderManagementPage