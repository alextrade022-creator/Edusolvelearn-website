import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <>
      <PageHero badge="404" title="This page took a day off">
        We couldn’t find the page you were looking for — but your child’s next great tutor is only a
        click away.
      </PageHero>
      <div className="flex justify-center pb-20 -mt-4">
        <Button to="/" size="lg">
          Back to Home
        </Button>
      </div>
    </>
  );
}
