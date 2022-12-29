import { Pagination } from '@mui/material'
import { SIZE_DEFAULT } from '../../../shared/constants/page.constant'

function SSPagination({page, total, onChange}: {page: number, total: number, onChange: any}) {
  const count = total%SIZE_DEFAULT === 0 ? total/SIZE_DEFAULT : (Math.floor(total/SIZE_DEFAULT) + 1)
  return (
    <div className="mt-2 d-flex justify-content-between" style={{ textAlign: 'right' }}>
        <div>
          {(page - 1) * SIZE_DEFAULT + 1} - {page * SIZE_DEFAULT < total  ? page * SIZE_DEFAULT : total} 
          &nbsp; trong tổng số &nbsp;
          {total}
        </div>
        <Pagination
          count={count} 
          defaultPage={1} 
          page={page} 
          siblingCount={1} 
          shape="rounded" 
          color="primary" 
          onChange={onChange} />
      </div>
  )
}

export default SSPagination
