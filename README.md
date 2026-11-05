# Thesis Statement Trainer

Choose the strongest thesis for a prompt and learn what makes a position clear and arguable.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE General Test and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Thesis Statement Trainer.exe` from the [latest release](https://github.com/Apurba94/gre-thesis-trainer/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/gre-thesis-trainer/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Your thesis decides how your Issue essay will be read. Practise choosing the strongest thesis among five, then write your own for any prompt and get rule-of-thumb feedback on position, reasons, conditions and absolute words.

Sections: Choose, Write, Progress, About.

## How to use it

1. Learn what makes a thesis strong in **Choose**.
2. Write your own in **Write**: one sentence, a clear position, a reason and, if you qualify it, the condition.
3. Treat the feedback as prompts to think, not as a grade.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (24 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
