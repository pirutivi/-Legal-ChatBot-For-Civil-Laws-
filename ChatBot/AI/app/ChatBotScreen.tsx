import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Fuse from "fuse.js";

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you with legal inquiries?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  // Predefined responses
  const responses = {
    "how long does a court case take": "It depends on the case type. Simple cases take weeks, complex ones take years.",
    "what is the court process": "The court process includes filing a case, hearings, evidence presentation, and judgment.",
    "how much does a lawyer cost": "Lawyer fees depend on experience, case complexity, and location.",
    "how do I file a legal complaint": "You can file a complaint at the local court or online through the judiciary website.",
    "what happens after an arrest": "After an arrest, the suspect is taken to jail, booked, and might be released on bail.",
    "can I represent myself in court": "Yes, but legal representation is recommended for better outcomes.",
    "hi": "Hello! How can I assist you?",
    "hello": "Hi there! How can I help?",
    "what legal help can you provide": "We provide guidance on legal topics like family law, court procedures, and dispute resolution.",
    "what should I do in case of family and marital disputes": "You can try mediation or seek legal advice. If necessary, you may file a case in court.",
    "how do I file a case for a family or marital dispute": "You need to submit a petition with relevant documents to the appropriate court, often with legal assistance.",
    "what happens if a court summons is not responded to": "Ignoring a court summons can lead to a default judgment or legal penalties.",
    "what happens during court hearings": "Hearings involve presenting evidence, witness testimonies, and legal arguments before a judge.",
    "how can I appeal a court decision": "You can file an appeal with a higher court within the given timeframe, usually with a lawyer’s help.",
    "can a dispute be resolved without going to trial": "Yes, mediation, arbitration, or settlement discussions can help resolve disputes outside court.",
    "what are the grounds for divorce under Kandyan Law": "Grounds include adultery, habitual drunkenness, desertion, and cruelty.",
    "what is the legal age for marriage under Kandyan Law": "The legal age is 18 years, though parental consent may be required for minors.",
    "can I get a divorce without going to court": "No, a court must grant the divorce after considering the presented grounds.",
    "what are the types of Kandyan marriages": "Kandyan marriages can be registered or unregistered, affecting inheritance and legal rights.",
    "how is a marriage registered under Kandyan Law": "It is registered at the local registrar’s office with witness statements and documentation.",
    "how is divorce recognized under Muslim Law in Sri Lanka": "Muslim divorces follow religious procedures and must be validated under Sri Lankan law.",
    "can a husband divorce his wife under Muslim Law": "Yes, through Talaq, but legal conditions and procedures must be followed.",
    "what is the difference between civil and criminal cases": "Civil cases involve disputes between individuals or organizations, while criminal cases involve offenses against the state.",
    "what are my rights if I'm arrested": "You have the right to remain silent, the right to an attorney, and the right to be informed of charges against you.",
    "what is bail, and how does it work": "Bail is a payment or bond allowing a defendant to be released from custody while awaiting trial.",
    "what happens if I miss a court date": "A warrant may be issued for your arrest, and you could face penalties.",
    "what is a legal affidavit": "An affidavit is a sworn written statement used as evidence in court.",
    "what is perjury": "Perjury is lying under oath, which is a punishable offense.",
    "what is contempt of court": "Disobeying a court order or showing disrespect to the court can lead to fines or jail time.",
    "what is contempt of court": "Disobeying a court order or showing disrespect to the court can lead to fines or jail time.",
    "can I cancel a signed contract": "It depends on the contract terms, but some contracts allow cancellation within a cooling-off period.",
    "what happens if someone breaks a contract": "The affected party can sue for damages or request specific performance.",
    "do verbal agreements hold up in court": "Some verbal agreements are legally binding, but written contracts are easier to enforce.",
    "how do I transfer property ownership": "Property can be transferred through sale, gift, or inheritance with proper legal documentation.",
    "what happens if someone dies without a will": "The estate is distributed according to intestacy laws.",
    "can a will be challenged": "Yes, if there is evidence of fraud, undue influence, or lack of mental capacity.",
    "what is a power of attorney": "A power of attorney allows someone to make legal or financial decisions on your behalf.",
    "what are my rights if I am unfairly dismissed": "You may be able to claim wrongful termination or unfair dismissal compensation.",
    "can my employer fire me without notice": "It depends on your employment contract and local labor laws.",
    "what should I do if my employer doesn’t pay me": "You can file a complaint with labor authorities or take legal action.",
    "what is workplace harassment": "Unwanted behavior that creates a hostile work environment, including discrimination and bullying.",
    "what are my rights if I buy a defective product": "You may be entitled to a refund, replacement, or repair.",
    "can a business refuse to give a refund": "It depends on the terms and consumer protection laws.",
    "how do I file a complaint against a business": "You can report it to consumer protection agencies or take legal action.",
    "what is child custody, and how is it decided": "Custody is determined based on the child's best interests, considering parental ability and stability.",
    "can I change my child’s custody agreement": "Yes, but you may need court approval based on changed circumstances.",
    "what is alimony, and who pays it": "Alimony is financial support paid to a spouse after divorce, based on income and needs.",
    "can grandparents get custody of a child": "In some cases, if it's in the child's best interests.",
    "what should I do if I get a traffic ticket": "You can pay the fine or contest it in court.",
    "can I go to jail for unpaid fines": "Yes, in some cases, if the fine remains unpaid despite legal notices.",
    "what is the penalty for drunk driving": "Penalties may include fines, license suspension, or imprisonment.",
    "how long does a criminal record last": "It depends on the offense and whether it qualifies for expungement."




  };

  // Setup fuzzy search
  const fuse = new Fuse(Object.keys(responses), { threshold: 0.4 });

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    const lowerInput = input.toLowerCase();

    // Check for exact match
    if (responses[lowerInput]) {
      setMessages([...messages, userMessage, { text: responses[lowerInput], sender: "bot" }]);
    } else {
      // Use fuzzy search
      const result = fuse.search(lowerInput);
      if (result.length > 0) {
        setMessages([...messages, userMessage, { text: responses[result[0].item], sender: "bot" }]);
      } else {
        setMessages([...messages, userMessage, { text: "OOPS ! Sorry , I'm a Legal Chatbot ,I'm not sure how to respond to that. Can you rephrase?", sender: "bot" }]);
      }
    }

    setInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Legal Chatbot</Text>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={[styles.messageBubble, msg.sender === "bot" ? styles.botMessage : styles.userMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your question..."
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "75%"
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#d1ecf1"
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#cce5ff"
  },
  messageText: {
    fontSize: 16
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16
  },
  sendButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16
  }
});

export default ChatBotScreen;
