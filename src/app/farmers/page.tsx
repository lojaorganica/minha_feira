import FarmersMap from '@/components/farmers-map';
import { getFarmers } from '@/lib/data';

export default function FarmersPage() {
  const farmers = getFarmers();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="font-headline text-4xl mb-4 text-primary">Find Our Farmers</h1>
        <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-md">
            <p className="text-lg text-foreground/80">
            To display the interactive map of farmer locations, a Google Maps API key is required.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
            Please create a <code className="font-code bg-muted px-1 py-0.5 rounded">.env.local</code> file in the root of your project and add the following line:
            </p>
            <pre className="mt-2 text-left bg-muted p-4 rounded-md overflow-x-auto">
            <code className="font-code text-foreground">
                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY_HERE"
            </code>
            </pre>
            <p className="mt-4 text-sm text-muted-foreground">
            After adding the key, please restart your development server.
            </p>
        </div>
      </div>
    );
  }

  return (
    <div>
        <div className="py-12 text-center bg-primary/10">
            <h1 className="font-headline text-4xl mb-2 text-primary">Our Farmers' Locations</h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">Explore the locations of our dedicated organic farmers and see where your food comes from.</p>
        </div>
        <FarmersMap farmers={farmers} apiKey={apiKey} />
    </div>
  );
}
