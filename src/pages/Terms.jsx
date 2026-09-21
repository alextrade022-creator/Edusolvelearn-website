import LegalPage from './LegalPage';
import { TERMS_SECTIONS } from '../data/content';

export default function Terms() {
  return <LegalPage title="Terms & Conditions" sections={TERMS_SECTIONS} />;
}
