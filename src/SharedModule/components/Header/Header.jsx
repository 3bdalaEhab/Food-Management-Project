import headerImage1 from "./../../../assets/Group 48102098.png"
import headerImage2 from "./../../../assets/eating a variety of foods-amico.png"
export default function Header({paragraph,title,imag,word}) {
  return <>

<div className="header-container text-white flex-sm-nowrap px-5 pt-5 flex-wrap d-flex justify-content-sm-between justify-content-center rounded-5 align-items-center mt-3 p-3">
      <div className="info">
        <div className="d-flex flex-column flex-wrap flex-sm-nowrap justify-content-center text-sm-start text-center align-items-center">
          <h2 className="fw-bold me-sm-auto animated-heading">{title} <span className="h3 fw-light">{word}</span></h2>
          <p className="me-sm-auto w-75  animated-paragraph">{paragraph}</p>
        </div>
      </div>
      <div className="image animated-image">
        <img className={`w-100 ${imag === 1 ? 'animated-image1' : 'animated-image2'}`} src={imag === 1 ? headerImage1 : headerImage2} alt="headerImage" />
      </div>
    </div>
  </>
}
