import { Link } from "react-router-dom";

export default function PageHeader({title, bCrumbItem1, bCrumbItem2, bCrumbActive}) {
  return (
    <div className="container-fluid py-5 d-flex align-items-center justify-content-center flex-column text-uppercase"
            style={{backgroundColor: 'rgb(247, 247, 247)'}}>
        <h2>{title}</h2>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link className="bCrumbItem" to="/">{bCrumbItem1}</Link></li>
                {bCrumbItem2 && <li className="breadcrumb-item"><Link className="bCrumbItem" to="/">{bCrumbItem2}</Link></li>}
                <li className="breadcrumb-item active" aria-current="page">{bCrumbActive}</li>
            </ol>
        </nav>
    </div>
  )
}
