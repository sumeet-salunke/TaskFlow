
import { Link } from 'react-router-dom';

const features = [
  {
    number: '01',
    title: 'Stay organized',
    description:
      'Keep tasks, descriptions, priorities, and deadlines in one place instead of scattered notes.',
    icon: '▤',
  },
  {
    number: '02',
    title: 'Prioritize your work',
    description:
      'Identify high-priority tasks and focus your energy on what matters most.',
    icon: '↗',
  },
  {
    number: '03',
    title: 'Track your progress',
    description:
      'Move tasks through their lifecycle and see what is pending, in progress, or completed.',
    icon: '✓',
  },
];

function LandingPage() {
  return (
    <main>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              YOUR WORKSPACE, SIMPLIFIED
            </span>

            <h1>
              Turn your plans into <span>progress.</span>
            </h1>

            <p className="hero-description">
              TaskFlow helps you organize your work, prioritize what matters,
              and keep moving toward your goals — one task at a time.
            </p>

            <div className="hero-actions">
              <Link to="/tasks/new" className="button button-primary">
                Create your first task <span aria-hidden="true">→</span>
              </Link>

              <Link to="/tasks" className="button button-secondary">
                Explore tasks
              </Link>
            </div>

            <div className="hero-note">
              <span className="status-dot" />
              Simple workflow. Clear priorities. Better focus.
            </div>
          </div>

          <div className="preview-wrap">
            <div className="preview-glow" />

            <div className="preview-card">
              <div className="preview-header">
                <div>
                  <span className="preview-label">WORKSPACE OVERVIEW</span>
                  <h2>Your day at a glance</h2>
                </div>
                <span className="avatar">TF</span>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <span>Total tasks</span>
                  <strong>12</strong>
                  <small>Across your workspace</small>
                </div>

                <div className="stat-card">
                  <span>Completed</span>
                  <strong>08</strong>
                  <small>Keep it moving</small>
                </div>
              </div>

              <div className="preview-list-header">
                <h3>Today's focus</h3>
                <span>Preview</span>
              </div>

              <div className="preview-task">
                <span className="task-check checked">✓</span>
                <div className="preview-task-copy">
                  <strong>Plan the weekly goals</strong>
                  <span>Planning</span>
                </div>
                <span className="priority priority-medium">Medium</span>
              </div>

              <div className="preview-task">
                <span className="task-check" />
                <div className="preview-task-copy">
                  <strong>Finish project documentation</strong>
                  <span>Development</span>
                </div>
                <span className="priority priority-high">High</span>
              </div>

              <div className="preview-task">
                <span className="task-check" />
                <div className="preview-task-copy">
                  <strong>Review pending work</strong>
                  <span>Review</span>
                </div>
                <span className="priority priority-low">Low</span>
              </div>

              <div className="preview-progress">
                <div className="progress-heading">
                  <span>Weekly progress</span>
                  <strong>67%</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" />
                </div>
              </div>

              <p className="preview-disclaimer">
                Illustrative dashboard preview
              </p>
            </div>

            <div className="floating-note">
              <span className="floating-check">✓</span>
              <div>
                <strong>One step forward</strong>
                <span>Progress starts with a plan.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">BUILT FOR YOUR FLOW</span>
            <h2>Everything you need to get moving.</h2>
            <p>
              A straightforward workspace that helps turn a long to-do list
              into manageable next steps.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <div className="feature-top">
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-number">{feature.number}</span>
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workflow-section">
        <div className="container workflow-grid">
          <div>
            <span className="eyebrow">A SIMPLE WORKFLOW</span>
            <h2>From scattered thoughts to a clear plan.</h2>
            <p className="workflow-description">
              You don't need a complicated system to make meaningful progress.
              Start with a task, decide its priority, and update its status as
              you work.
            </p>
          </div>

          <div className="workflow-steps">
            <div className="workflow-step">
              <span>01</span>
              <div>
                <h3>Capture</h3>
                <p>Write down what needs to get done.</p>
              </div>
            </div>

            <div className="workflow-step">
              <span>02</span>
              <div>
                <h3>Organize</h3>
                <p>Add details, priorities, and a clear status.</p>
              </div>
            </div>

            <div className="workflow-step">
              <span>03</span>
              <div>
                <h3>Complete</h3>
                <p>Update your progress and keep moving forward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-content">
          <span className="eyebrow">YOUR NEXT STEP STARTS HERE</span>
          <h2>Make room for meaningful work.</h2>
          <p>Create your first task and start building a workflow that works for you.</p>

          <Link to="/tasks/new" className="button button-light">
            Get started <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
