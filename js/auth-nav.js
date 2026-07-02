// ===================================================
// Klaso — updates the navbar based on login state
// Include this AFTER supabase-client.js on every page
// ===================================================

async function updateNav() {
  const navActions = document.getElementById('navActions');
  if (!navActions) return;

  const { data: { session } } = await supabaseClient.auth.getSession();

  if (session) {
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('name, role')
      .eq('id', session.user.id)
      .single();

    const firstName = profile ? profile.name.split(' ')[0] : 'Account';

    navActions.innerHTML = `
      <a href="${window.location.pathname.includes('/pages/') ? '' : 'pages/'}profile.html" style="font-size:0.88rem; color:var(--slate); margin-right:4px; text-decoration:underline;">Hi, ${firstName}</a>
      <button id="logoutBtn" class="btn btn-ghost btn-sm">Log out</button>
    `;

    document.getElementById('logoutBtn').addEventListener('click', async () => {
      await supabaseClient.auth.signOut();
      window.location.reload();
    });
  }
  // If no session, leave the default "Log in / Get started" buttons as-is
}

updateNav();