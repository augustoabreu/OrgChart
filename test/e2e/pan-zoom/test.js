import { Selector } from 'testcafe';

fixture `Pan & Zoom`
  .page `../../../demo/pan-zoom.html`;

const chart = Selector('.orgchart').nth(0);

test('drag the chart to the left', async t => {
  await t
      .drag(chart, 100, 0, { offsetX: 10, offsetY: 10 })
      .expect(chart).eql('matrix(1, 0, 0, 1, -100, 0)');
});