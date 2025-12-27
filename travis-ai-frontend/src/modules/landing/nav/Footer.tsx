const Footer = () => {
  const CURRENTYEAR = new Date().getFullYear();
  return (
    <div className="p-7 flex justify-between">
      <h1 className="text-xl"> IceChain Labs</h1>
      <p className="text-xl">{CURRENTYEAR}</p>
    </div>
  );
};

export default Footer;
