import './App.css';

const quotes = [
  "DevOps is not a tool, it is a culture.",
  "Kubernetes is the operating system of the cloud.",
  "GitOps makes Git the single source of truth.",
  "Automation is the future of infrastructure.",
  "Containers changed modern deployments."
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function App() {
  const quote = getRandomQuote();

  return (
    <div className="container">
      <div className="card">
        <h1>🚀 Helm + FluxCD Demo V3</h1>

        <p className="quote">"{quote}"</p>

        <div className="info">
          <p><strong>Environment:</strong> Development</p>
          <p><strong>Version:</strong> v3</p>
          <p><strong>Platform:</strong> Kubernetes + FluxCD</p>
        </div>

        <button onClick={() => window.location.reload()}>
          Generate Quote
        </button>
      </div>
    </div>
  );
}

export default App;