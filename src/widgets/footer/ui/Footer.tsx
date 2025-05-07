import cl from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={cl.container}>
      <div className="text-center">
        <p>© {new Date().getFullYear()} Sova</p>
      </div>
    </footer>
  );
};

export default Footer;