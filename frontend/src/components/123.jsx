// Đây là một component dùng arrow function và props
const Welcome = (props) => {
    return <h1>Chào mừng, {props.name}!</h1>;
  };
  
  // Sử dụng component Welcome ở nơi khác
  const App = () => {
    return (
      <div>
        <Welcome name="Mai" />
        <Welcome name="Long" />
      </div>
    );
  };

  export default App;

  