const About = () => {
  return (
    <>
      <section>
        <h2>How the website works?</h2>
        <p>
          Your messages are secured using **RSA encryption**, ensuring that only
          you and the intended recipient can read them. When you send a message,
          it is **encrypted on your device using the recipient's public key**
          before being stored in the website's database. Since only the
          recipient's **private key** can decrypt it, no one else—including
          us—can access your messages. The only data stored in the database are
          **public keys, usernames and encrypted messages**. Your public key
          acts as your unique identifier, while your username simply provides a
          readable way to recognize who you're messaging. There is **no
          traditional authentication system** like passwords or email
          verification. Instead, your access is based entirely on your **RSA key
          pair**. To log in, you just provide your **public and private keys**,
          and the system verifies that they match. If your public key exists in
          the database, you're recognized as a returning user; otherwise, you
          can generate a new key pair to create a fresh identity. This approach
          ensures maximum privacy and security while keeping the system
          lightweight and simple to use.
        </p>
      </section>

      <section>
        <h2>Tech stack:</h2>
        <ul>
          <li>Solid Start</li>
          <li>Uno CSS</li>
          <li>Pocketbase</li>
          <li>Solid UI</li>
          <li>RSA asymmetrical encryption with 256 curve</li>
          <li>Pooyan Salmani</li>
          <li>2025</li>
        </ul>
      </section>
    </>
  );
};

export default About;
