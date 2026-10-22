import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="container not-found-page">
      <span className="eyebrow">PAGE NOT FOUND</span>
      <h1>That page does not exist.</h1>
      <p>Use one of the links below to get back to your TaskFlow workspace.</p>
      <div className="detail-actions">
        <Link to="/" className="button button-secondary">Back home</Link>
        <Link to="/tasks" className="button button-primary">View tasks</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
