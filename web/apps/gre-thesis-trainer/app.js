/* Thesis Statement Trainer: pick the strongest thesis, then write your own and get feedback. */
(function () {
  'use strict';
  const items = (bank) => bank.map((x) => ({ id: x.id, type: 'single', topic: 'Choose the thesis', stem: 'Prompt: ' + x.prompt + '\n\nWhich is the strongest thesis statement?', choices: x.choices, answer: x.answer, explanation: x.explanation }));
  // Feedback on a thesis a student writes. These are rules of thumb, and the app says so.
  const advise = (t) => {
    const w = SK.text.wordCount(t), low = ' ' + t.toLowerCase() + ' ';
    const notes = [];
    if (w < 12) notes.push('Short: a thesis usually needs a position and a reason.');
    if (w > 45) notes.push('Long: aim for one clear sentence of 15 to 40 words.');
    if (/ (i will|this essay will|in this essay)/.test(low)) notes.push('Announcing what you will do is not a thesis. State your position instead.');
    if (/ (always|never|everyone|no one|all) /.test(low)) notes.push('Absolute words make a claim easy to attack. Is there a case where it fails?');
    // A reason, a condition or a comparison ("less ... than", "rather than") all count as developing the position.
    if (!/ (because|since|as|but|although|though|while|whereas|unless|when|if|where|than|rather|yet|so that|only) /.test(low)) notes.push('Add a reason (because ...) or a condition (but, unless, when ...).');
    if (/ (good|bad|important|interesting) /.test(low) && w < 18) notes.push('Vague words such as good or important need specifics.');
    return notes;
  };
  const App = {
    about: 'Your thesis decides how your Issue essay will be read. Practise choosing the strongest thesis among five, then write your own for any prompt and get rule-of-thumb feedback on position, reasons, conditions and absolute words.',
    how: ['Learn what makes a thesis strong in **Choose**.', 'Write your own in **Write**: one sentence, a clear position, a reason and, if you qualify it, the condition.', 'Treat the feedback as prompts to think, not as a grade.'],
    tabs: [
      SK.bankTab('choose', 'Choose', (ctx) => items(ctx.data.theses), { sizes: [6], modes: false }),
      { id: 'write', label: 'Write', render(el, ctx) {
        const prompts = ctx.data.issue_prompts.prompts;
        let p = SK.pick(SK.rng(SK.seedNow()), prompts);
        const pr = SK.h('div', { class: 'sk-passage', text: p.text });
        const inp = SK.h('textarea', { style: { minHeight: '80px' }, placeholder: 'Your thesis in one sentence', 'aria-label': 'Your thesis' });
        const out = SK.h('div', {});
        el.appendChild(SK.card('Write a thesis', pr, SK.btn('Another prompt', () => { p = SK.pick(SK.rng(SK.seedNow()), prompts); pr.textContent = p.text; }, 'ghost small'), SK.h('div', { style: { marginTop: '10px' } }, inp),
          SK.h('div', { style: { marginTop: '10px' } }, SK.btn('Check my thesis', () => { SK.clear(out); const n = advise(inp.value); out.appendChild(n.length ? SK.note(n.join(' '), 'wrong') : SK.note('No warning signs. Check that your essay will actually argue this.', 'right')); }, '', { 'data-auto': 'once' })), out));
      } },
    ],
    advise,
    checks: {
      'the model theses pass and the weak ones are caught': (data, assert) => {
        for (const x of data.theses) assert.deepEqual(advise(x.choices[x.answer]).filter((n) => !n.startsWith('Long')), [], x.choices[x.answer]);
        assert.ok(advise('I will discuss competition in this essay.').length >= 2);
        assert.ok(advise('Competition always brings out the best in everyone.').some((n) => n.startsWith('Absolute')));
      },
      'choice questions are valid': (data, assert) => { for (const it of items(data.theses)) assert.deepEqual(SK.validateItem(it), []); },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
