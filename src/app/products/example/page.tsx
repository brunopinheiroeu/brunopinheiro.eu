import Image from "next/image";
import { ArrowLeft, Calendar, Tag, Users, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function ExampleProjectPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Customer Support Platform
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            Revolutionizing customer service with intelligent automation and
            seamless human handoff
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-4 w-4" />
              October 2024
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full font-medium">
              AI Product Management
            </span>
            <span className="px-3 py-1 text-sm bg-violet-100 text-violet-800 rounded-full font-medium">
              Machine Learning
            </span>
            <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full font-medium">
              Customer Support
            </span>
            <span className="px-3 py-1 text-sm bg-violet-100 text-violet-800 rounded-full font-medium">
              Automation
            </span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-96 w-full bg-gradient-to-br from-indigo-500 to-violet-700">
        <Image
          src="/images/photo1.png"
          alt="AI Customer Support Platform"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>

      {/* Content */}
      <article className="mx-auto max-w-5xl px-6 py-12">
        {/* Problem & Persona */}
        <section className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1 w-12 bg-indigo-600"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Problem & Persona
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              <strong>Target Persona:</strong> Sarah, a Customer Support Manager
              at a mid-sized SaaS company with 50+ support agents handling
              10,000+ monthly tickets.
            </p>
            <p className="mb-4">
              <strong>Pain Points:</strong>
            </p>
            <ul className="mb-4">
              <li>Average response time of 4 hours due to ticket volume</li>
              <li>
                70% of tickets are repetitive questions that could be automated
              </li>
              <li>
                Support agents spend 60% of their time on routine inquiries
              </li>
              <li>
                Customer satisfaction scores declining due to slow response
                times
              </li>
              <li>High agent burnout from handling repetitive tasks</li>
            </ul>
            <p>
              The existing workflow required agents to manually search through
              documentation, previous tickets, and knowledge bases for each
              inquiry, creating significant delays and inconsistent responses
              across the team.
            </p>
          </div>
        </section>

        {/* Solution & Outcome */}
        <section className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1 w-12 bg-violet-600"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Solution & Outcome
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              <strong>Product Objective:</strong> Build an AI-powered support
              platform that automatically handles routine inquiries while
              seamlessly escalating complex issues to human agents.
            </p>
            <p className="mb-4">
              <strong>Key Results Achieved:</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  85%
                </div>
                <div className="text-sm text-gray-700">
                  Reduction in average response time (from 4h to 36min)
                </div>
              </div>
              <div className="bg-violet-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-violet-600 mb-2">
                  70%
                </div>
                <div className="text-sm text-gray-700">
                  Of tickets fully automated without human intervention
                </div>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  +42%
                </div>
                <div className="text-sm text-gray-700">
                  Increase in customer satisfaction scores (CSAT)
                </div>
              </div>
            </div>
            <p className="mb-4">
              <strong>Additional Metrics:</strong>
            </p>
            <ul>
              <li>Agent productivity increased by 3x for complex issues</li>
              <li>Cost per ticket reduced by 60%</li>
              <li>First contact resolution rate improved from 45% to 78%</li>
              <li>Agent satisfaction scores increased by 35%</li>
            </ul>
          </div>
        </section>

        {/* Design & Experience */}
        <section className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1 w-12 bg-indigo-600"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Design & Experience
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              The UI/UX design focused on creating a seamless experience that
              feels natural and augments the user's workflow rather than
              replacing it.
            </p>
            <p className="mb-4">
              <strong>Key Design Principles:</strong>
            </p>
            <ul className="mb-4">
              <li>
                <strong>Transparent AI:</strong> Users always know when they're
                interacting with AI vs. humans
              </li>
              <li>
                <strong>Confidence Indicators:</strong> Visual cues show AI
                confidence levels for each response
              </li>
              <li>
                <strong>One-Click Escalation:</strong> Instant handoff to human
                agents when needed
              </li>
              <li>
                <strong>Context Preservation:</strong> Full conversation history
                maintained during escalations
              </li>
            </ul>
            <p className="mb-4">
              <strong>Vibe-Coding Approach:</strong> Leveraged my
              design/frontend background to translate the intended "feeling" of
              trust and efficiency directly into functional code. The interface
              uses subtle animations and micro-interactions to provide feedback
              and build confidence in the AI's capabilities.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <p className="text-sm text-gray-600 italic">
                "The interface feels like having a knowledgeable colleague
                looking over your shoulder, ready to help but never intrusive."
                - Beta Tester Feedback
              </p>
            </div>
            <p>
              The design serves as a defensive moat by creating a user
              experience that's difficult to replicate - combining AI
              intelligence with human-centered design that builds trust and
              efficiency.
            </p>
          </div>
        </section>

        {/* Execution & Collaboration */}
        <section className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1 w-12 bg-violet-600"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Execution & Collaboration
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Led a cross-functional team of 8 members including ML engineers,
              backend developers, frontend engineers, and UX designers through a
              6-month development cycle.
            </p>
            <p className="mb-4">
              <strong>Team Structure & Collaboration:</strong>
            </p>
            <ul className="mb-4">
              <li>
                <strong>ML Team (2):</strong> Focused on model training,
                fine-tuning, and RAG implementation
              </li>
              <li>
                <strong>Backend Team (2):</strong> Built scalable API
                infrastructure and vector database integration
              </li>
              <li>
                <strong>Frontend Team (2):</strong> Implemented responsive UI
                and real-time features
              </li>
              <li>
                <strong>UX Designer (1):</strong> Conducted user research and
                created design system
              </li>
              <li>
                <strong>Data Scientist (1):</strong> Analyzed usage patterns and
                optimized model performance
              </li>
            </ul>
            <p className="mb-4">
              <strong>Key Challenges Resolved:</strong>
            </p>
            <ul className="mb-4">
              <li>
                <strong>Conflicting Priorities:</strong> Engineering wanted to
                launch with basic features quickly, while stakeholders demanded
                comprehensive functionality. Resolved by implementing a phased
                rollout with clear success metrics for each phase.
              </li>
              <li>
                <strong>Model Latency:</strong> Initial response times of 8-12
                seconds were unacceptable. Worked with ML team to implement a
                hybrid approach using fast non-reasoning models for simple
                queries and reasoning models only for complex issues.
              </li>
              <li>
                <strong>Stakeholder Alignment:</strong> Created weekly demos and
                maintained a public roadmap to ensure all stakeholders
                understood progress and could provide input early.
              </li>
            </ul>
          </div>
        </section>

        {/* AI/Technical Approach */}
        <section className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1 w-12 bg-indigo-600"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              AI/Technical Approach
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              <strong>Hybrid Model Architecture:</strong>
            </p>
            <ul className="mb-4">
              <li>
                <strong>Non-Reasoning Models (GPT-3.5-turbo):</strong> Used for
                70% of queries requiring fast responses (FAQ, status checks,
                simple troubleshooting). Average latency: 1.2 seconds.
              </li>
              <li>
                <strong>Reasoning Models (GPT-4):</strong> Reserved for complex
                issues requiring multi-step reasoning, technical debugging, or
                policy interpretation. Average latency: 4.5 seconds.
              </li>
              <li>
                <strong>Classification Layer:</strong> Custom fine-tuned model
                to route queries to appropriate model tier with 94% accuracy.
              </li>
            </ul>
            <p className="mb-4">
              <strong>Technical Stack:</strong>
            </p>
            <ul className="mb-4">
              <li>
                <strong>Framework:</strong> LangChain for orchestration and
                prompt management
              </li>
              <li>
                <strong>Vector Database:</strong> Pinecone for semantic search
                across 50,000+ support articles
              </li>
              <li>
                <strong>APIs:</strong> OpenAI API for LLM inference, Cohere for
                embeddings
              </li>
              <li>
                <strong>RAG Implementation:</strong> Custom retrieval system
                with re-ranking and context compression
              </li>
              <li>
                <strong>Monitoring:</strong> LangSmith for tracing and debugging
                LLM chains
              </li>
            </ul>
            <p className="mb-4">
              <strong>RAG System Design:</strong>
            </p>
            <ol className="mb-4">
              <li>Query understanding and expansion using semantic search</li>
              <li>
                Retrieval of top 20 relevant documents from vector database
              </li>
              <li>Re-ranking using cross-encoder model to select top 5</li>
              <li>Context compression to fit within token limits</li>
              <li>Response generation with source citations</li>
            </ol>
          </div>
        </section>

        {/* Risks & Learnings */}
        <section className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1 w-12 bg-violet-600"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Risks & Learnings
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              <strong>Handling AI Hallucination:</strong>
            </p>
            <ul className="mb-4">
              <li>
                <strong>Confidence Scoring:</strong> Implemented a multi-factor
                confidence score combining model probability, retrieval
                relevance, and response consistency
              </li>
              <li>
                <strong>Automatic Escalation:</strong> Queries with confidence
                below 75% automatically escalated to human agents
              </li>
              <li>
                <strong>Source Attribution:</strong> Every AI response includes
                citations to source documents, allowing users to verify
                information
              </li>
              <li>
                <strong>Feedback Loop:</strong> Human agents can flag incorrect
                responses, which are used to fine-tune the classification and
                retrieval systems
              </li>
            </ul>
            <p className="mb-4">
              <strong>Key Failures & Pivots:</strong>
            </p>
            <ul className="mb-4">
              <li>
                <strong>Initial Approach:</strong> Started with a single GPT-4
                model for all queries. Abandoned after 2 weeks due to cost
                ($12,000/month) and latency issues.
              </li>
              <li>
                <strong>Pivot:</strong> Implemented hybrid architecture reducing
                costs by 80% while improving response times.
              </li>
              <li>
                <strong>Learning:</strong> Not all queries need the most
                powerful model - matching model capability to query complexity
                is crucial for production AI systems.
              </li>
            </ul>
            <p className="mb-4">
              <strong>Ethical Considerations:</strong>
            </p>
            <ul className="mb-4">
              <li>Transparent disclosure of AI usage to customers</li>
              <li>
                Privacy-preserving design with no customer data used for model
                training
              </li>
              <li>
                Regular bias audits of model responses across different customer
                segments
              </li>
              <li>Human oversight for all policy-related decisions</li>
            </ul>
            <p className="mb-4">
              <strong>Next Steps:</strong>
            </p>
            <ul>
              <li>
                Implement multi-language support using specialized translation
                models
              </li>
              <li>
                Add proactive support features that predict issues before
                customers report them
              </li>
              <li>
                Expand to voice-based support using speech-to-text and
                text-to-speech models
              </li>
              <li>
                Build agent co-pilot features to assist human agents with
                complex cases
              </li>
            </ul>
          </div>
        </section>
      </article>

      {/* Footer Navigation */}
      <div className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
