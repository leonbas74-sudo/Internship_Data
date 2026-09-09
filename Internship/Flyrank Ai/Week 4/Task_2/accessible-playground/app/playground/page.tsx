import Modal from "./Modal";
import Tabs from "./Tabs";
import Disclosure from "./Disclosure";

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen p-10 space-y-10">
      <h1 className="text-3xl font-bold">Accessibility Playground</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">Modal</h2>
        <Modal />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Tabs</h2>
        <Tabs />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Disclosure</h2>
        <Disclosure />
      </section>
    </main>
  );
}