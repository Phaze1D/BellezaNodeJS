import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { inputDate } from 'utils/date'

class BannerForm extends React.Component {
  render () {
    const {
      banner,
      errors,
      onRequestSubmit
    } = this.props

    let start_date = new Date(banner.get('start_date'))
    let day = start_date.getDate() < 10 ? `0${start_date.getDate()}`  : start_date.getDate()
    let month = start_date.getMonth() + 1 < 10 ? `0${start_date.getMonth() + 1}`  : start_date.getMonth() + 1
    start_date = `${start_date.getFullYear()}-${month}-${day}`


    let end_date = new Date(banner.get('end_date'))
    let eday = end_date.getDate() < 10 ? `0${end_date.getDate()}` : end_date.getDate()
    let emonth = end_date.getMonth() + 1 < 10 ? `0${end_date.getMonth() + 1}`  : end_date.getMonth() + 1
    end_date = `${end_date.getFullYear()}-${emonth}-${eday}`

    return (
        <form className="main-form grid-wrap" onSubmit={onRequestSubmit}>

          <div className="col-12">
            <label>Activo</label>
            {errors.get('manual_active') && <div className="error-div">{errors.get('manual_active')}</div>}
            <input type="checkbox" name="manual_active" defaultChecked={banner.get('manual_active')}/>
          </div>


          <div className="col-3">
            <label>Start</label>
            {errors.get('start_date') && <div className="error-div">{errors.get('start_date')}</div>}
            <input type="date" name="start_date" defaultValue={start_date}/>
          </div>


          <div className="col-3">
            <label>End</label>
            {errors.get('end_date') && <div className="error-div">{errors.get('end_date')}</div>}
            <input type="date" name="end_date" defaultValue={end_date}/>
          </div>


          <div className="col-3">
            <label>Image</label>
            {errors.get('image') && <div className="error-div">{errors.get('image')}</div>}
            <input type="file" name="image"/>
          </div>


          <div className="col-3">
            <label>Link To</label>
            {errors.get('link_to') && <div className="error-div">{errors.get('link_to')}</div>}
            <input type="text" name="link_to" defaultValue={banner.get('link_to')}/>
          </div>


          <input className="submit full" type="submit" value="Save"/>
          <Link className="cancel full" to="/backoffice/banners">Cancel</Link>
        </form>
    )
  }
}

export default BannerForm;
