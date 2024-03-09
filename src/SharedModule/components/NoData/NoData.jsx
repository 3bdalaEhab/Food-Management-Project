import noData from "../../../assets/nodata.png"

export default function NoData({world}) {
  return <>
  <div className="text-center mx-auto mt-2">
      <img className="w-50gi" src={noData} alt="noData" />
      <h5 className="mt-3">{world}</h5>
      <p>Are you sure you want to delete this item?<br/> If you are sure just click on delete it</p>
    </div>
  
  </>
  
  
}
