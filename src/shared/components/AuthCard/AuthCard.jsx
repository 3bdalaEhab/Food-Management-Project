import logo from '../../../assets/4 4.svg';

const AuthCard = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`Auth-container ${className}`}>
      <div className="overlay">
        <div className="container">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="p-5 rounded-4 bg-white animated-paragraph shadow-lg">
                <div className="logo w-100 text-center mb-4">
                  <img className="w-100" src={logo} alt="Logo" />
                </div>
                <div className="h-Form mb-4">
                  <h4 className="text-secondary-emphasis fw-semibold mb-2">
                    {title}
                  </h4>
                  {subtitle && (
                    <p className="text-secondary mb-0">
                      {subtitle}
                    </p>
                  )}
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
