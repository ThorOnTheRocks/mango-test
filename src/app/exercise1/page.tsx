import { Range } from '@/components';
import { getMinMax } from '@/services';
import styles from '../page.module.css';

export default async function NormalRangePage(): Promise<JSX.Element> {
  const range = await getMinMax();
  const { min, max } = range;

  return (
    <section className={styles.pageContainer}>
      <Range min={min} max={max} />
    </section>
  );
}
