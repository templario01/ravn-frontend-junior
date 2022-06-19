interface NavBarProps {
  title: string
}

export const NavBar: React.FC<NavBarProps> = ({ title }) => {
  return (
    <div className="w w-full bg-slate-700">
      <div className="container mx-auto bg-slate-700 py-4 text-left">
        <h1 className="font-bold text-white text-xl">{title}</h1>
      </div>
    </div>
  )
}
