import { FixedRange } from '@/components';
import { getFixedValues } from '@/services';
import styles from '../page.module.css';

export default async function FixedRangePage(): Promise<JSX.Element> {
  const fixedValues = await getFixedValues();
  const { rangeValues } = fixedValues;

  return (
    <section className={styles.pageContainer}>
      <FixedRange rangeValues={rangeValues} />
    </section>
  );
}
